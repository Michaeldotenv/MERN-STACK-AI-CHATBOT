import jwt from "jsonwebtoken";

/**
 * Generate and send JWT token as a secure HTTP-only cookie
 * @param {Response} res - Express response object
 * @param {string} userId - The user's unique ID
 * @param {Object} [options] - Additional cookie options
 * @returns {string} token - The generated JWT token
 * @throws {Error} If token generation fails
 */
export const generateToken = (res, userId, options = {}) => {
  // Validate required environment variables
  if (!process.env.JWT_SECRET || !process.env.JWT_EXPIRES_IN) {
    throw new Error("JWT configuration incomplete");
  }

  // Default cookie configuration
  const defaultCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    maxAge: parseInt(process.env.JWT_EXPIRES_IN) || 7 * 24 * 60 * 60 * 1000, // 7 days default
    path: "/",
    domain: process.env.COOKIE_DOMAIN || undefined,
    signed: true // Requires cookie-parser middleware with secret
  };

  try {
    // Generate JWT token
    const token = jwt.sign(
      { 
        userId,
        iss: process.env.JWT_ISSUER || 'nexus-chatbot-api',
        aud: process.env.JWT_AUDIENCE || 'nexus-chatbot-client'
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
        algorithm: 'HS256' // Explicitly specify algorithm
      }
    );

    // Set cookie with merged options
    res.cookie("token", token, {
      ...defaultCookieOptions,
      ...options
    });

    // Also set a simple cookie for cross-origin detection if needed
    if (process.env.NODE_ENV === "production") {
      res.cookie("auth_check", "1", {
        maxAge: defaultCookieOptions.maxAge,
        domain: defaultCookieOptions.domain,
        secure: true,
        sameSite: 'none'
      });
    }

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

  return jwt.verify(token, process.env.JWT_SECRET, {
    algorithms: ['HS256'],
    issuer: process.env.JWT_ISSUER,
    audience: process.env.JWT_AUDIENCE
  });
};

/**
 * Clear authentication cookies
 * @param {Response} res - Express response object
 */
export const clearAuthCookies = (res) => {
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    domain: process.env.COOKIE_DOMAIN || undefined
  };

  res.clearCookie("token", options);
  res.clearCookie("auth_check", { 
    path: "/",
    domain: process.env.COOKIE_DOMAIN || undefined 
  });
};