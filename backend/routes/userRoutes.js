import express from "express";
import User from "../models/user.model.js";
import { loginUser, newUser } from "../controllers/userControllers/authController.js";
import {
    getCurrentUserProfile,
    getProfileById,
    getProfileByIdWithPosts,
    updateProfile,
} from "../controllers/userControllers/profileController.js";
import {
    addNewFollowing,
    followUser,
    removeFollowing,
    unfollowUser,
} from "../controllers/userControllers/connectivityController.js";
import { checkTokenExpiration } from "../middleware/authMiddleware.js";

const userRoutes = express.Router();

// Register a new user
userRoutes.post("/register/newuser", newUser);
userRoutes.post("/login", loginUser);

userRoutes.get("/:uid/profile/full", getProfileByIdWithPosts);

// Apply auth middleware to protected routes
userRoutes.use(checkTokenExpiration);

// Profile routes
userRoutes.get("/:uid/profile", getProfileById);
userRoutes.put("/:uid/profile/update", updateProfile);
userRoutes.get("/:uid/profile/me", getCurrentUserProfile);

// Connectivity routes
userRoutes.post("/:uid/follow/:fid", followUser);
userRoutes.post("/:uid/unfollow/:fid", unfollowUser);
userRoutes.post("/:uid/add-new-following/:fid", addNewFollowing);
userRoutes.post("/:uid/remove-following/:fid", removeFollowing);

// Search users for chat
userRoutes.get("/search", async (req, res) => {
    const { q } = req.query;
    try {
        const users = await User.find({
            username: { $regex: q, $options: "i" }, // Case-insensitive search
            _id: { $ne: req.user._id }, // Exclude current user
        })
            .select("username avatar") // Only return needed fields
            .limit(10); // Limit results
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Search failed" });
    }
});

export default userRoutes;