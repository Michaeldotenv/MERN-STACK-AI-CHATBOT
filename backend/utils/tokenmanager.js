import jwt from "jsonwebtoken";

const JWT_SECRET = "vihb7e8hrwivwpi9ivg9oj589vjwinrjhojgrfuygi";
const COOKIE_DOMAIN = "nexusai-chatbot.vercel.app";
const JWT_EXPIRES_IN = "7d";

export const generateToken = (res, userId, options = {}) => {
  const defaultCookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/",
    domain: COOKIE_DOMAIN,
    signed: true
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

    res.cookie("auth_check", "1", {
      maxAge: defaultCookieOptions.maxAge,
      domain: defaultCookieOptions.domain,
      secure: true,
      sameSite: 'none'
    });

    return token;
  } catch (error) {
    console.error("Token generation failed:", error);
    res.clearCookie("token", defaultCookieOptions);
    res.clearCookie("auth_check");
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
  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    domain: COOKIE_DOMAIN
  };

  res.clearCookie("token", options);
  res.clearCookie("auth_check", {
    path: "/",
    secure: true,
    sameSite: "none",
    domain: COOKIE_DOMAIN
  });
};
