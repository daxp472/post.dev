import User from "../models/user.model.js";
import { User_auth } from "../models/user_auth.model.js";


export const checkTokenExpiration = async(req, res, next) => {
    
    try {
        const hashedToken = ( req.headers.authorization)
        const currentTime = Date.now();
        const expiration_time = (await User_auth.findOne({hashed_token : hashedToken})).expiration_time
        
        // Compare the current time with the expiration time
        if (currentTime > expiration_time) {
            // If the token has expired, return an error response
            res.status(401).json({
                success: true,
                is_logined : false,
                message : "The token is not valid.",
                current_time : currentTime,
                expiration_time : expiration_time
            })
        } else {
            // If the token is still valid, proceed to the next middleware or route handler
            req.user = (await User_auth.findOne({hashed_token : hashedToken})).hashed_token
            next();
        }
    } catch (error) {
        res.status(401).json({
            success: false,
            is_logined : false,
            message : "The token is not valid.",
            error : error
        })
    }
};

