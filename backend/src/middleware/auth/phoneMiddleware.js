const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { prisma } = require("../../lib/prisma");
const twilio = require("twilio");

// Twilio setup
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = accountSid && authToken ? twilio(accountSid, authToken) : null;

// Extractor function for auth context
function extractAccessToken(req) {
	const header = req.headers.authorization;
	if (header && typeof header === "string") {
		const [scheme, token] = header.split(" ");
		if (scheme === "Bearer" && token) return token;
	}

	if (req.cookies && typeof req.cookies.accessToken === "string" && req.cookies.accessToken.length > 0) {
		return req.cookies.accessToken;
	}

	return null;
}

// Generate a 6-digit numeric string
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendPhoneVerificationHandler(req, res) {
	try {
		const accessToken = extractAccessToken(req);
		let userId = null;
		let phoneToVerify = null;

		if (accessToken) {
			let payload;
			try {
				payload = jwt.verify(accessToken, process.env.JWT_SECRET || "dev-secret-change-this");
				userId = payload.sub;
			} catch (err) {}
		}

		if (!userId) {
            // Require phone in body if not authenticated
			const { phone } = req.body || {};
			if (!phone) {
				return res.status(401).json({ ok: false, error: "Authentication required or phone must be provided." });
			}
            
			const userParams = await prisma.users.findFirst({ where: { phone } });
			if (!userParams) return res.status(404).json({ ok: false, error: "User not found with this phone number." });
			userId = userParams.id;
			phoneToVerify = userParams.phone;
			
			if (userParams.is_phone_verified) {
				return res.status(400).json({ ok: false, error: "Phone number is already verified." });
			}
		} else {
			const userParams = await prisma.users.findUnique({ where: { id: userId } });
			if (!userParams) return res.status(404).json({ ok: false, error: "User not found." });
			phoneToVerify = userParams.phone;
			if (!phoneToVerify) {
                return res.status(400).json({ ok: false, error: "No phone number attached to this account." });
            }
			if (userParams.is_phone_verified) {
				return res.status(400).json({ ok: false, error: "Phone number is already verified." });
			}
		}

        const otp = generateOTP();
        const hashCode = await bcrypt.hash(otp, 10);
        // Set expiry for 15 minutes from now
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

        // Update user in database
        await prisma.users.update({
            where: { id: userId },
            data: {
                phone_verification_code: hashCode,
                phone_verification_expires: expiresAt
            }
        });

        // Send out an SMS using Twilio
        if (client) {
            try {
                await client.messages.create({
                    body: `Your Orvexa verification code is: ${otp}. It will expire in 15 minutes.`,
                    from: process.env.TWILIO_PHONE_NUMBER,
                    to: phoneToVerify
                });
            } catch (err) {
                 return res.status(500).json({ ok: false, error: "Failed to send SMS: " + err.message });
            }
        } else {
            console.log(`[SMS Simulation] To: ${phoneToVerify} | Code: ${otp}`);
        }

		return res.status(200).json({
			ok: true,
			message: client ? "Verification SMS sent successfully." : "Verification SMS simulation printed to console. Please configure Twilio in .env.",
		});
	} catch (error) {
		return res.status(500).json({ ok: false, error: error.message });
	}
}

async function confirmPhoneVerificationHandler(req, res) {
	try {
		const { phone, code } = req.body || {};

		if (!code || typeof code !== "string" || code.length !== 6) {
			return res.status(400).json({ ok: false, error: "A 6-digit verification code is required." });
		}
        
        let user;
        
        // Find user by phone in body or token
        const accessToken = extractAccessToken(req);
		let userId = null;

		if (accessToken) {
			try {
				let payload = jwt.verify(accessToken, process.env.JWT_SECRET || "dev-secret-change-this");
				userId = payload.sub;
			} catch (err) {}
		}

        if (userId) {
            user = await prisma.users.findUnique({ where: { id: userId } });
        } else if (phone) {
            user = await prisma.users.findFirst({ where: { phone } });
        } else {
            return res.status(400).json({ ok: false, error: "Authentication or phone number required." });
        }

		if (!user) {
			return res.status(404).json({ ok: false, error: "User not found." });
		}

		if (user.is_phone_verified) {
			return res.status(400).json({ ok: false, error: "Phone number is already verified." });
		}

        if (!user.phone_verification_code || !user.phone_verification_expires) {
            return res.status(400).json({ ok: false, error: "No pending verification found." });
        }

        if (new Date() > user.phone_verification_expires) {
            return res.status(400).json({ ok: false, error: "Verification code has expired. Please request a new one." });
        }

        const isMatch = await bcrypt.compare(code, user.phone_verification_code);
        if (!isMatch) {
            return res.status(401).json({ ok: false, error: "Invalid verification code." });
        }

		// Update the user
		await prisma.users.update({
			where: { id: user.id },
			data: { 
                is_phone_verified: true,
                phone_verification_code: null,
                phone_verification_expires: null
            },
		});

		return res.status(200).json({ ok: true, message: "Phone verified successfully." });
	} catch (error) {
		return res.status(500).json({ ok: false, error: error.message });
	}
}

module.exports = {
	sendPhoneVerificationHandler,
	confirmPhoneVerificationHandler,
};
