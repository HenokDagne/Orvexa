const jwt = require("jsonwebtoken");
const { prisma } = require("../../lib/prisma");

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

	return null;
}

function verifyAccessToken(token) {
	const secret = process.env.JWT_SECRET || "dev-secret-change-this";
	return jwt.verify(token, secret);
}

async function getMeHandler(req, res) {
	try {
		const accessToken = extractAccessToken(req);
		if (!accessToken) {
			return res.status(401).json({ ok: false, error: "Authentication token is required." });
		}

		let payload;
		try {
			payload = verifyAccessToken(accessToken);
		} catch (tokenError) {
			return res.status(401).json({ ok: false, error: "Invalid or expired token." });
		}

		if (!payload || typeof payload.sub !== "string") {
			return res.status(401).json({ ok: false, error: "Invalid token payload." });
		}

		const user = await prisma.users.findUnique({
			where: { id: payload.sub },
			select: {
				id: true,
				username: true,
				email: true,
				name: true,
				phone: true,
				status: true,
				created_at: true,
				updated_at: true,
			},
		});

		if (!user) {
			return res.status(404).json({ ok: false, error: "User not found." });
		}

		return res.status(200).json({ ok: true, data: user });
	} catch (error) {
		return res.status(500).json({ ok: false, error: error.message });
	}
}

module.exports = {
	getMeHandler,
};
