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

async function loginHandler(req, res) {
  try {
    const { email, password } = req.body || {};

    if (typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
      return res.status(400).json({ ok: false, error: "email is required and must be valid." });
    }

    if (typeof password !== "string" || password.length === 0) {
      return res.status(400).json({ ok: false, error: "password is required." });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await prisma.users.findUnique({
      where: { email: normalizedEmail },
      select: {
        id: true,
        email: true,
        password_hash: true,
        name: true,
        phone: true,
        status: true,
      },
    });

    if (!user) {
      return res.status(401).json({ ok: false, error: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ ok: false, error: "Invalid email or password." });
    }

    const token = signAccessToken(user);
    const refreshToken = signRefreshToken(user);

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

    return res.status(200).json({
      ok: true,
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        status: user.status,
        token,
      },
    });
  } catch (error) {
    return res.status(500).json({ ok: false, error: error.message });
  }
}

module.exports = {
  loginHandler,
};