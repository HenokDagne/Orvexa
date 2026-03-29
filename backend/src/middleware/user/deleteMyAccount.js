const { prisma } = require("../../lib/prisma");
const jwt = require("jsonwebtoken");

/**
 * Express handler to delete the authenticated user's account.
 * Requires authentication (access token in header or cookie).
 * Deletes the user and returns a confirmation.
 */
async function deleteMyAccountHandler(req, res) {
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

    // Delete user
    await prisma.users.delete({ where: { id: userId } });

    // Clear cookies
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

    return res.status(200).json({ ok: true, message: "Account deleted successfully." });
  } catch (error) {
    if (error.code === 'P2025') {
      // Record not found
      return res.status(404).json({ ok: false, error: "User not found." });
    }
    return res.status(500).json({ ok: false, error: error.message });
  }
}

module.exports = { deleteMyAccountHandler };
