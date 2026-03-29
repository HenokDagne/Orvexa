const jwt = require("jsonwebtoken");
const { prisma } = require("../../lib/prisma");

const revokedRefreshTokens = new Set();

function getAccessSecret() {
	return process.env.JWT_SECRET || "dev-secret-change-this";
}

function getRefreshSecret() {
	return process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET || "dev-secret-change-this";
}

function getAccessExpiresIn() {
	return process.env.JWT_EXPIRES_IN || "15m";
}

function getRefreshExpiresIn() {
	return process.env.JWT_REFRESH_EXPIRES_IN || "7d";
}

function signAccessToken(user) {
	return jwt.sign(
		{
			sub: user.id,
			email: user.email,
		},
		getAccessSecret(),
		{ expiresIn: getAccessExpiresIn() }
	);
}

function signRefreshToken(user) {
	return jwt.sign(
		{
			sub: user.id,
			email: user.email,
			type: "refresh",
		},
		getRefreshSecret(),
		{ expiresIn: getRefreshExpiresIn() }
	);
}

function extractRefreshToken(req) {
	if (req.cookies && typeof req.cookies.refreshToken === "string" && req.cookies.refreshToken.length > 0) {
		return req.cookies.refreshToken;
	}

	if (req.body && typeof req.body.refreshToken === "string" && req.body.refreshToken.length > 0) {
		return req.body.refreshToken;
	}

	const header = req.headers["x-refresh-token"];
	if (typeof header === "string" && header.length > 0) {
		return header;
	}

	return null;
}

async function refreshTokenHandler(req, res) {
	try {
		const refreshToken = extractRefreshToken(req);

		if (!refreshToken) {
			return res.status(401).json({
				ok: false,
				error: "Refresh token required.",
			});
		}

		if (revokedRefreshTokens.has(refreshToken)) {
			return res.status(401).json({
				ok: false,
				error: "Refresh token already used. Please login again.",
			});
		}

		let payload;
		try {
			payload = jwt.verify(refreshToken, getRefreshSecret());
		} catch (tokenError) {
			return res.status(401).json({
				ok: false,
				error: "Invalid or expired refresh token.",
			});
		}

		if (payload.type !== "refresh" || typeof payload.sub !== "string") {
			return res.status(401).json({
				ok: false,
				error: "Invalid refresh token payload.",
			});
		}

		const user = await prisma.users.findUnique({
			where: { id: payload.sub },
			select: { id: true, email: true, name: true, phone: true, status: true },
		});

		if (!user || user.status !== "active") {
			return res.status(401).json({
				ok: false,
				error: "User not found or inactive.",
			});
		}

		revokedRefreshTokens.add(refreshToken);

		const newAccessToken = signAccessToken(user);
		const newRefreshToken = signRefreshToken(user);

		res.cookie("accessToken", newAccessToken, {
			httpOnly: true,
			sameSite: "lax",
			secure: process.env.NODE_ENV === "production",
			maxAge: 15 * 60 * 1000,
		});

		res.cookie("refreshToken", newRefreshToken, {
			httpOnly: true,
			sameSite: "lax",
			secure: process.env.NODE_ENV === "production",
			maxAge: 7 * 24 * 60 * 60 * 1000,
		});

		return res.status(200).json({
			ok: true,
			data: {
				id: user.id,
				email: user.email,
				name: user.name,
				phone: user.phone,
				status: user.status,
				token: newAccessToken,
			},
		});
	} catch (error) {
		return res.status(500).json({ ok: false, error: error.message });
	}
}

module.exports = {
	refreshTokenHandler,
};
