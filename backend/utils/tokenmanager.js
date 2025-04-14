import jwt from "jsonwebtoken";

/**
 * Generate and send JWT token as an HTTP-only cookie
 * @param {Response} res - Express response object
 * @param {string} userId - The user's unique ID
 * @returns {string} token - The generated JWT token
 */
export const generateToken = (res, userId) => {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET not configured");
    }

    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // must be true in production
      sameSite: "none", // allows cross-site cookie
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: "/",
      signed: true, // optional: use cookie-parser with secret
    });

    return token;
  } catch (error) {
    console.error("Token generation failed:", error);
    res.status(500).json({ error: "Authentication system error" });
    throw error;
  }
};
