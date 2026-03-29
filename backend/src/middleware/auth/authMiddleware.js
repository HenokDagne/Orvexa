const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { prisma } = require("../../lib/prisma");

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function signAccessToken(user) {
	const secret = process.env.JWT_SECRET || "dev-secret-change-this";
	const expiresIn = process.env.JWT_EXPIRES_IN || "15m";

	return jwt.sign(
		{
			sub: user.id,
			email: user.email,
		},
		secret,
		{ expiresIn }
	);
}

function signRefreshToken(user) {
	const secret = process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET || "dev-secret-change-this";
	const expiresIn = process.env.JWT_REFRESH_EXPIRES_IN || "7d";

	return jwt.sign(
		{
			sub: user.id,
			email: user.email,
			type: "refresh",
		},
		secret,
		{ expiresIn }
	);
}

async function registerHandler(req, res) {
	try {
		const { email, password, name, phone } = req.body || {};

		if (typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
			return res.status(400).json({ ok: false, error: "email is required and must be valid." });
		}

		if (typeof password !== "string" || password.length < 8) {
			return res.status(400).json({ ok: false, error: "password must be at least 8 characters." });
		}

		if (name !== undefined && typeof name !== "string") {
			return res.status(400).json({ ok: false, error: "name must be a string when provided." });
		}

		if (phone !== undefined && typeof phone !== "string") {
			return res.status(400).json({ ok: false, error: "phone must be a string when provided." });
		}

		const normalizedEmail = email.trim().toLowerCase();

		const existing = await prisma.users.findUnique({
			where: { email: normalizedEmail },
			select: { id: true },
		});

		if (existing) {
			return res.status(409).json({ ok: false, error: "Email already registered." });
		}

		const password_hash = await bcrypt.hash(password, 10);

		const createdUser = await prisma.users.create({
			data: {
				email: normalizedEmail,
				password_hash,
				name: typeof name === "string" && name.trim().length > 0 ? name.trim() : null,
				phone: typeof phone === "string" && phone.trim().length > 0 ? phone.trim() : null,
			},
			select: {
				id: true,
				email: true,
				name: true,
				phone: true,
				status: true,
			},
		});

		try {
			await prisma.user_roles.create({
				data: {
					user_id: createdUser.id,
					role: "user",
				},
			});
		} catch (roleError) {
			// Role creation is optional for this flow; keep account creation successful.
		}

		const token = signAccessToken(createdUser);
		const refreshToken = signRefreshToken(createdUser);

		res.cookie("accessToken", token, {
			httpOnly: true,
			sameSite: "lax",
			secure: process.env.NODE_ENV === "production",
			maxAge: 15 * 60 * 1000,
		});

		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			sameSite: "lax",
			secure: process.env.NODE_ENV === "production",
			maxAge: 7 * 24 * 60 * 60 * 1000,
		});

		return res.status(201).json({
			ok: true,
			data: {
				id: createdUser.id,
				email: createdUser.email,
				name: createdUser.name,
				phone: createdUser.phone,
                
				status: createdUser.status,
				token,
			},
		});
	} catch (error) {
		return res.status(500).json({ ok: false, error: error.message });
	}
}

module.exports = {
	registerHandler,
};
