const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { prisma } = require("../../lib/prisma");

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getResetSecret() {
	return process.env.JWT_RESET_SECRET || process.env.JWT_SECRET || "dev-secret-change-this";
}

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

async function forgotPasswordHandler(req, res) {
	try {
		const { email } = req.body || {};

		if (typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
			return res.status(400).json({ ok: false, error: "Valid email is required." });
		}

		const normalizedEmail = email.trim().toLowerCase();
		const user = await prisma.users.findUnique({
			where: { email: normalizedEmail },
			select: { id: true, email: true },
		});

		if (!user) {
			return res.status(200).json({
				ok: true,
				message: "If the email exists, a reset link has been sent.",
			});
		}

		const resetToken = jwt.sign(
			{
				sub: user.id,
				email: user.email,
				type: "password_reset",
			},
			getResetSecret(),
			{ expiresIn: process.env.PASSWORD_RESET_EXPIRES_IN || "15m" }
		);

		return res.status(200).json({
			ok: true,
			message: "Reset token generated.",
			data: {
				resetToken,
			},
		});
	} catch (error) {
		return res.status(500).json({ ok: false, error: error.message });
	}
}

async function resetPasswordHandler(req, res) {
	try {
		const { token, newPassword } = req.body || {};

		if (typeof token !== "string" || token.length === 0) {
			return res.status(400).json({ ok: false, error: "Reset token is required." });
		}

		if (typeof newPassword !== "string" || newPassword.length < 8) {
			return res.status(400).json({ ok: false, error: "newPassword must be at least 8 characters." });
		}

		let payload;
		try {
			payload = jwt.verify(token, getResetSecret());
		} catch (tokenError) {
			return res.status(401).json({ ok: false, error: "Invalid or expired reset token." });
		}

		if (!payload || payload.type !== "password_reset" || typeof payload.sub !== "string") {
			return res.status(401).json({ ok: false, error: "Invalid reset token payload." });
		}

		const user = await prisma.users.findUnique({ where: { id: payload.sub }, select: { id: true } });
		if (!user) {
			return res.status(404).json({ ok: false, error: "User not found." });
		}

		const password_hash = await bcrypt.hash(newPassword, 10);

		await prisma.users.update({
			where: { id: user.id },
			data: { password_hash },
		});

		return res.status(200).json({ ok: true, message: "Password reset successfully." });
	} catch (error) {
		return res.status(500).json({ ok: false, error: error.message });
	}
}

async function changePasswordHandler(req, res) {
	try {
		const { currentPassword, newPassword } = req.body || {};

		if (typeof currentPassword !== "string" || currentPassword.length === 0) {
			return res.status(400).json({ ok: false, error: "currentPassword is required." });
		}

		if (typeof newPassword !== "string" || newPassword.length < 8) {
			return res.status(400).json({ ok: false, error: "newPassword must be at least 8 characters." });
		}

		const accessToken = extractAccessToken(req);
		if (!accessToken) {
			return res.status(401).json({ ok: false, error: "Authentication token is required." });
		}

		let payload;
		try {
			payload = jwt.verify(accessToken, process.env.JWT_SECRET || "dev-secret-change-this");
		} catch (tokenError) {
			return res.status(401).json({ ok: false, error: "Invalid or expired token." });
		}

		if (!payload || typeof payload.sub !== "string") {
			return res.status(401).json({ ok: false, error: "Invalid token payload." });
		}

		const user = await prisma.users.findUnique({
			where: { id: payload.sub },
			select: { id: true, password_hash: true },
		});

		if (!user) {
			return res.status(404).json({ ok: false, error: "User not found." });
		}

		const isCurrentMatch = await bcrypt.compare(currentPassword, user.password_hash);
		if (!isCurrentMatch) {
			return res.status(401).json({ ok: false, error: "Current password is incorrect." });
		}

		const password_hash = await bcrypt.hash(newPassword, 10);

		await prisma.users.update({
			where: { id: user.id },
			data: { password_hash },
		});

		return res.status(200).json({ ok: true, message: "Password changed successfully." });
	} catch (error) {
		return res.status(500).json({ ok: false, error: error.message });
	}
}

module.exports = {
	forgotPasswordHandler,
	resetPasswordHandler,
	changePasswordHandler,
};
