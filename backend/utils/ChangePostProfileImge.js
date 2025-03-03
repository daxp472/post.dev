import Post from "../models/post.model";
import User from "../models/user.model";

export const updateUserImageInPosts = async (userId, newImageUrl) => {
    try {
        // 1. Find user and get the array of post IDs
        const user = await User.findById(userId);
        if (!user) {
            console.log("User not found");
            return;
        }

        const postIds = user.posts;  // Array of post IDs

        // 2. Update all posts in the posts collection
        await Post.updateMany(
            { _id: { $in: postIds } },   // Filter: Match all posts in the array
            { $set: { user_image: newImageUrl } }  // Update the user_image field
        );

        console.log("User image updated in all posts!");
    } catch (error) {
        console.error("Error updating user image in posts:", error);
    }
};