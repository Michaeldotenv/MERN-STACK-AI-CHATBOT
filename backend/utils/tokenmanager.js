import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "vihb7e8hrwivwpi9ivg9oj589vjwinrjhojgrfuygi";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

const defaultCookieOptions = {
  maxAge: 7 * 24 * 60 * 60 * 1000,
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'None',
  path: '/'
};

export const generateToken = (res, userId, options = {}) => {
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

  res.cookie('token', token, {
    ...defaultCookieOptions,
    ...options
  });

  return token;
};

export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET, {
    algorithms: ['HS256'],
    issuer: 'nexus-chatbot-api',
    audience: 'nexus-chatbot-client'
  });
};

export const clearAuthCookies = (res) => {
  res.clearCookie('token', defaultCookieOptions);
};
