import jwt from "jsonwebtoken"

export const generateToken = (res, userId) => {
    try {
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET not configured");
        }

        // Create token with userId payload
        const token = jwt.sign(
            { userId },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        // Set cookie with token
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            path: "/",
            signed: true,
            domain: process.env.NODE_ENV === "production" 
                ? ".yourdomain.com" 
                : undefined
        });

        return token;
    } catch (error) {
        console.error("Token generation failed:", error);
        res.status(500).json({ error: "Authentication system error" });
        throw error;
    }
};
