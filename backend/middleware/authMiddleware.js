import { User_auth } from "../models/user_auth.model.js";

export const checkTokenExpiration = async (req, res, next) => {
    try {
        // Token ko "Bearer <token>" format se parse karo
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                success: false,
                is_logined: false,
                message: "No token provided",
            });
        }

        // Ek baar mein User_auth se pura document fetch karo
        const userAuth = await User_auth.findOne({ hashed_token: token });
        if (!userAuth) {
            return res.status(401).json({
                success: false,
                is_logined: false,
                message: "Invalid token",
            });
        }

        const currentTime = Date.now();
        const { expiration_time, userId } = userAuth; // Assume userId hai model mein

        // Token expiration check
        if (currentTime > expiration_time) {
            return res.status(401).json({
                success: false,
                is_logined: false,
                message: "The token has expired",
                current_time: currentTime,
                expiration_time: expiration_time,
            });
        }

        // req.user mein user ID ya data daal do
        req.user = { _id: userId, token: token }; // Adjust based on your needs
        next();
    } catch (error) {
        res.status(50010.json({
            success: false,
            is_logined: false,
            message: "Authentication error",
            error: error.message,
        });
    )}
};