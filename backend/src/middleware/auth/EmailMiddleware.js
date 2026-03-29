const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const { prisma } = require("../../lib/prisma");

// Function to extract access token from the request
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

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.SMTP_USER,
		pass: process.env.SMTP_PASS,
	},
});

async function sendEmailVerificationHandler(req, res) {
	try {
		// Find the user first
		const accessToken = extractAccessToken(req);
		let userId = null;
		let emailToVerify = null;

		if (accessToken) {
			let payload;
			try {
				payload = jwt.verify(accessToken, process.env.JWT_SECRET || "dev-secret-change-this");
				userId = payload.sub;
			} catch (err) {}
		}

		// If not authenticated, they might pass email in body
		if (!userId) {
			const { email } = req.body || {};
			if (!email) {
				return res.status(401).json({ ok: false, error: "Authentication required or email must be provided." });
			}
			const userParams = await prisma.users.findUnique({ where: { email } });
			if (!userParams) return res.status(404).json({ ok: false, error: "User not found." });
			userId = userParams.id;
			emailToVerify = userParams.email;
			
			if (userParams.is_email_verified) {
				return res.status(400).json({ ok: false, error: "Email is already verified." });
			}
		} else {
			const userParams = await prisma.users.findUnique({ where: { id: userId } });
			if (!userParams) return res.status(404).json({ ok: false, error: "User not found." });
			emailToVerify = userParams.email;
			if (userParams.is_email_verified) {
				return res.status(400).json({ ok: false, error: "Email is already verified." });
			}
		}

		// Create a verification token
		const verificationToken = jwt.sign(
			{
				sub: userId,
				email: emailToVerify,
				type: "email_verification",
			},
			process.env.JWT_RESET_SECRET || process.env.JWT_SECRET || "dev-secret-change-this",
			{ expiresIn: process.env.EMAIL_VERIFICATION_EXPIRES_IN || "24h" }
		);

		// Verification URL (to be sent in the email)
		const verificationUrl = `${process.env.FRONTEND_URL || "http://localhost:3000"}/verify-email?token=${verificationToken}`;

		// Email options
		const mailOptions = {
			from: `"Orvexa" <${process.env.SMTP_USER}>`,
			to: emailToVerify,
			subject: "Email Verification - Orvexa",
			html: `
				<h1>Verify your email</h1>
				<p>Wait! One more step to verify your email address. Please click the link below:</p>
				<a href="${verificationUrl}">Verify Email</a>
				<p>This link will expire in 24 hours.</p>
			`,
		};

		// Send email
		await transporter.sendMail(mailOptions);

		return res.status(200).json({
			ok: true,
			message: "Verification email sent successfully.",
		});
	} catch (error) {
		return res.status(500).json({ ok: false, error: error.message });
	}
}

async function confirmEmailVerificationHandler(req, res) {
	try {
		// Can be in query param or body
		const token = req.query.token || req.body.token;

		if (!token || typeof token !== "string") {
			return res.status(400).json({ ok: false, error: "Verification token is required." });
		}

		let payload;
		try {
			payload = jwt.verify(token, process.env.JWT_RESET_SECRET || process.env.JWT_SECRET || "dev-secret-change-this");
		} catch (tokenError) {
			return res.status(401).json({ ok: false, error: "Invalid or expired verification token." });
		}

		if (!payload || payload.type !== "email_verification" || typeof payload.sub !== "string") {
			return res.status(401).json({ ok: false, error: "Invalid token payload." });
		}

		const user = await prisma.users.findUnique({ where: { id: payload.sub }, select: { id: true, is_email_verified: true } });
		if (!user) {
			return res.status(404).json({ ok: false, error: "User not found." });
		}

		if (user.is_email_verified) {
			return res.status(400).json({ ok: false, error: "Email is already verified." });
		}

		// Update the user
		await prisma.users.update({
			where: { id: user.id },
			data: { is_email_verified: true },
		});

		return res.status(200).json({ ok: true, message: "Email verified successfully." });
	} catch (error) {
		return res.status(500).json({ ok: false, error: error.message });
	}
}

module.exports = {
	sendEmailVerificationHandler,
	confirmEmailVerificationHandler,
};
