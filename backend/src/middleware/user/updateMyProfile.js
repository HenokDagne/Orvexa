const { prisma } = require("../../lib/prisma");
const jwt = require("jsonwebtoken");

/**
 * Express handler to update the authenticated user's profile.
 * Allows updating name, username, and phone (if not already verified).
 * Requires authentication (access token in header or cookie).
 */
async function updateMyProfileHandler(req, res) {
  try {
    // Extract access token
    const header = req.headers.authorization;
    let token = null;
    if (header && typeof header === "string") {
      const [scheme, t] = header.split(" ");
      if (scheme === "Bearer" && t) token = t;
    }
    if (!token && req.cookies && typeof req.cookies.accessToken === "string") {
      token = req.cookies.accessToken;
    }
    if (!token) {
      return res.status(401).json({ ok: false, error: "Authentication required." });
    }
    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET || "dev-secret-change-this");
    } catch (err) {
      return res.status(401).json({ ok: false, error: "Invalid or expired token." });
    }
    if (!payload || typeof payload.sub !== "string") {
      return res.status(401).json({ ok: false, error: "Invalid token payload." });
    }
    const userId = payload.sub;

    // Only allow updating certain fields
    const { name, username, phone } = req.body || {};
    const data = {};
    if (name !== undefined) {
      if (typeof name !== "string" || name.trim().length < 2) {
        return res.status(400).json({ ok: false, error: "Name must be at least 2 characters." });
      }
      data.name = name.trim();
    }
    if (username !== undefined) {
      if (typeof username !== "string" || username.trim().length < 3) {
        return res.status(400).json({ ok: false, error: "Username must be at least 3 characters." });
      }
      data.username = username.trim();
    }
    if (phone !== undefined) {
      if (typeof phone !== "string" || phone.trim().length < 7) {
        return res.status(400).json({ ok: false, error: "Phone must be a valid string." });
      }
      // Only allow changing phone if not verified
      const user = await prisma.users.findUnique({ where: { id: userId }, select: { is_phone_verified: true } });
      if (user && user.is_phone_verified) {
        return res.status(400).json({ ok: false, error: "Cannot change phone after verification." });
      }
      data.phone = phone.trim();
    }
    if (Object.keys(data).length === 0) {
      return res.status(400).json({ ok: false, error: "No valid fields to update." });
    }
    // Update user
    let updated;
    try {
      updated = await prisma.users.update({
        where: { id: userId },
        data,
        select: {
          id: true,
          username: true,
          email: true,
          name: true,
          phone: true,
          status: true,
          is_email_verified: true,
          is_phone_verified: true,
          created_at: true,
          updated_at: true,
        },
      });
    } catch (err) {
      if (err.code === 'P2002') {
        // Unique constraint failed
        return res.status(409).json({ ok: false, error: "Username or phone already in use." });
      }
      throw err;
    }
    return res.status(200).json({ ok: true, data: updated });
  } catch (error) {
    return res.status(500).json({ ok: false, error: error.message });
  }
}

module.exports = { updateMyProfileHandler };
