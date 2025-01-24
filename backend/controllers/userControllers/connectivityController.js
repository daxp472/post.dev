import User from "../../models/user.model.js";

// Add follower
export const followUser = async (req, res) => {
    try {
        const followerId = req.params.fid;
        const userId = req.params.uid;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (user.followers.includes(followerId)) {
            return res.status(200).json({
                success: true,
                message: "User already followed"
            });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                $push: { followers: followerId },
                $inc: { followers_count: 1 }
            },
            { new: true, runValidators: true }
        );

        return res.status(200).json({
            success: true,
            message: "Successfully followed user"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Remove follower
export const unfollowUser = async (req, res) => {
    try {
        const followerId = req.params.fid;
        const userId = req.params.uid;

        const user = await User.findById(userId);

        if (!user || !user.followers.includes(followerId)) {
            return res.status(200).json({
                success: true,
                message: "User is not being followed"
            });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                $pull: { followers: followerId },
                $inc: { followers_count: -1 }
            },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Successfully unfollowed user"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const addNewFollowing = async (req, res) => {
    try {
        const followerId = req.params.fid;
        const userId = req.params.uid;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (user.following.includes(followerId)) {
            return res.status(200).json({
                success: true,
                message: "User already followed"
            });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                $push: { following: followerId },
                $inc: { following_count: 1 }
            },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Successfully followed user"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const removeFollowing = async (req, res) => {
    try {
        const followerId = req.params.fid;
        const userId = req.params.uid;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (!user.following.includes(followerId)) {
            return res.status(400).json({
                success: false,
                message: "User is not being followed"
            });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                $pull: { following: followerId },
                $inc: { following_count: -1 }
            },
            { new: true, runValidators: true }
        );

        return res.status(200).json({
            success: true,
            message: "Successfully unfollowed user"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};