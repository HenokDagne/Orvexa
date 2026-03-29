const jwt = require("jsonwebtoken");

const revokedAccessTokens = new Set();

function extractBearerToken(req) {
	const header = req.headers.authorization;
	if (!header || typeof header !== "string") return null;

	const [scheme, token] = header.split(" ");
	if (scheme !== "Bearer" || !token) return null;

	return token;
}

function extractAccessToken(req) {
	const bearerToken = extractBearerToken(req);
	if (bearerToken) return bearerToken;

	if (req.cookies && typeof req.cookies.accessToken === "string" && req.cookies.accessToken.length > 0) {
		return req.cookies.accessToken;
	}

	if (req.body && typeof req.body.token === "string" && req.body.token.length > 0) {
		return req.body.token;
	}

	return null;
}

function verifyAccessToken(token) {
	const secret = process.env.JWT_SECRET || "dev-secret-change-this";
	return jwt.verify(token, secret);
}

async function logoutHandler(req, res) {
	try {
		const accessToken = extractAccessToken(req);

		if (!accessToken) {
			return res.status(401).json({
				ok: false,
				error: "Token required. Send Bearer token, cookie accessToken, or body token.",
			});
		}

		if (revokedAccessTokens.has(accessToken)) {
			return res.status(401).json({
				ok: false,
				error: "Token already logged out. Please login again.",
			});
		}

		try {
			verifyAccessToken(accessToken);
		} catch (tokenError) {
			return res.status(401).json({
				ok: false,
				error: "Invalid or expired token.",
			});
		}

		revokedAccessTokens.add(accessToken);

		res.clearCookie("refreshToken", {
			httpOnly: true,
			sameSite: "lax",
			secure: process.env.NODE_ENV === "production",
		});

		res.clearCookie("accessToken", {
			httpOnly: true,
			sameSite: "lax",
			secure: process.env.NODE_ENV === "production",
		});

		return res.status(200).json({
			ok: true,
			message: "Logged out successfully.",
			details: { tokenRevoked: true },
		});
	} catch (error) {
		return res.status(500).json({ ok: false, error: error.message });
	}
}

module.exports = {
	logoutHandler,
};
