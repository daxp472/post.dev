import User from "../../models/user.model.js";

// Get user profile by ID
export const getProfileById = async (req, res) => {
    try {
        const userId = req.params.uid;
        console.log(`The uid is : ${userId}`)
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Return public profile data
        return res.status(200).json({
            success: true,
            data: {
                email: user.email,
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
                title: user.title,
                bio: user.bio,
                avatar: user.avatar,
                accountType: user.accountType,
                visibility: user.visibility,
                followers_count: user.followers_count,
                following_count: user.following_count
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get current user's full profile
export const getCurrentUserProfile = async (req, res) => {
    try {
        // Using the Firebase UID which is stored as _id in MongoDB
        const firebaseUid = req.headers.authorization;
        const user = await User.findById(firebaseUid)
            .populate('likedPosts')
            .populate('followers')
            .populate('following')
            .populate({
                path: 'posts', // Assuming posts is an array of Post objects
                model: 'Post'  // Ensure to replace 'Post' with the actual model name if different
            });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: {
                id: user._id,
                username: user.username,
                email: user.email,
                firstname: user.firstname,
                lastname: user.lastname,
                title: user.title,
                bio: user.bio,
                avatar: user.avatar,
                accountType: user.accountType,
                visibility: user.visibility,
                status: user.status,
                language: user.language,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                posts: user.posts, // Include posts in the response
                ...user._doc
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update user profile
export const updateProfile = async (req, res) => {
    try {
        const { firstname, lastname, title, bio, visibility } = req.body;
        const user = await User.findById(req.params.uid);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Update fields if provided
        if (firstname) user.firstname = firstname;
        if (lastname) user.lastname = lastname;
        if (title) user.title = title;
        if (bio) user.bio = bio;
        if (visibility) user.visibility = visibility;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: {
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
                title: user.title,
                bio: user.bio,
                visibility: user.visibility
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}; 