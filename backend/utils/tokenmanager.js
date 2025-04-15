import jwt from "jsonwebtoken";

/**
 * Generate and send JWT token as a secure HTTP-only cookie
 * @param {Response} res - Express response object
 * @param {string} userId - The user's unique ID
 * @param {Object} [options] - Additional cookie options
 * @returns {string} token - The generated JWT token
 * @throws {Error} If token generation fails
 */

// Hardcoded values for consistency
const JWT_SECRET = "vihb7e8hrwivwpi9ivg9oj589vjwinrjhojgrfuygi";
const COOKIE_DOMAIN = "nexus-ai-chatbotv1.onrender.com";
const JWT_EXPIRES_IN = "7d";

export const generateToken = (res, userId, options = {}) => {
  // Default cookie configuration - consistent with other files
  const defaultCookieOptions = {
    httpOnly: true,
    secure: true, // Always secure for production
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days default
    path: "/",
    domain: COOKIE_DOMAIN,
    signed: true // Requires cookie-parser middleware with secret
  };

  try {
    // Generate JWT token
    const token = jwt.sign(
      { 
        userId,
        iss: 'nexus-chatbot-api',
        aud: 'nexus-chatbot-client'
      },
      JWT_SECRET,
      {
        expiresIn: JWT_EXPIRES_IN,
        algorithm: 'HS256' // Explicitly specify algorithm
      }
    );

    // Set cookie with merged options
    res.cookie("token", token, {
      ...defaultCookieOptions,
      ...options
    });

    // Also set a simple cookie for cross-origin detection if needed
    res.cookie("auth_check", "1", {
      maxAge: defaultCookieOptions.maxAge,
      domain: defaultCookieOptions.domain,
      secure: true,
      sameSite: 'none'
    });

    return token;
  } catch (error) {
    console.error("Token generation failed:", error);
    
    // Clear any potentially partial cookies
    res.clearCookie("token", defaultCookieOptions);
    res.clearCookie("auth_check");
    
    throw new Error("Authentication system error");
  }
};

/**
 * Verify JWT token from cookie or header
 * @param {string} token - JWT token to verify
 * @returns {Object} Decoded token payload
 * @throws {Error} If verification fails
 */
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

/**
 * Clear authentication cookies
 * @param {Response} res - Express response object
 */
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