import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "vihb7e8hrwivwpi9ivg9oj589vjwinrjhojgrfuygi";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

export const generateToken = (res, userId, options = {}) => {
  const defaultCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'none',
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/"
    // ✅ No domain!
  };

  try {
    const token = jwt.sign(
      { 
        userId,
        iss: 'nexus-chatbot-api',
        aud: 'nexus-chatbot-client'
      },
      JWT_SECRET,
      {
        expiresIn: JWT_EXPIRES_IN,
        algorithm: 'HS256'
      }
    );

    res.cookie("token", token, {
      ...defaultCookieOptions,
      ...options
    });

    return token;
  } catch (error) {
    console.error("❌ Token generation failed:", error);
    res.clearCookie("token", defaultCookieOptions);
    throw new Error("Authentication system error");
  }
};

export const verifyToken = (token) => {
  if (!token) {
    throw new Error("No token provided");
  }

  return jwt.verify(token, JWT_SECRET, {
    algorithms: ['HS256'],
    issuer: 'nexus-chatbot-api',
    audience: 'nexus-chatbot-client'
  });
};

export const clearAuthCookies = (res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'none',
    path: "/"
    // ✅ No domain!
  });
};
