const { prisma } = require("../../lib/prisma");

/**
 * Express handler to get a user by ID (from req.params.id)
 * Returns basic user info, or 404 if not found.
 */
async function getUserByIdHandler(req, res) {
  try {
    const { id } = req.params;
    if (!id || typeof id !== "string" || id.trim().length === 0) {
      return res.status(400).json({ ok: false, error: "User id is required." });
    }

    const user = await prisma.users.findUnique({
      where: { id },
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

    if (!user) {
      return res.status(404).json({ ok: false, error: "User not found." });
    }

    return res.status(200).json({ ok: true, data: user });
  } catch (error) {
    return res.status(500).json({ ok: false, error: error.message });
  }
}

module.exports = { getUserByIdHandler };
