import mongoose from "mongoose";
import Post from "../../models/post.model.js";
import User from "../../models/user.model.js";

export const postRouteEntry = (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to the POST.dev API",
        timestamp: Date.now()
    });
};

export const getAllPosts = async (req, res) => {
    try {
        const allPosts = await Post.find();

        // Check if there are any posts
        if (!allPosts || allPosts.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No posts found",
                timestamp: Date.now()
            });
        }

        res.status(200).json({
            success: true,
            message: "Posts fetched successfully",
            data: allPosts,
            count: allPosts.length,
            timestamp: Date.now()
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching posts",
            error: error.message,
            timestamp: Date.now()
        });
    }
};

export const createNewPost = async (req, res) => {
    try {
        const { user_id, title, content, tags, image } = req.body;

        // Validate required fields
        if (!user_id || !title || !content) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields",
                details: {
                    user_id: user_id ? "✓" : "✗ required",
                    title: title ? "✓" : "✗ required",
                    content: content ? "✓" : "✗ required"
                },
                timestamp: Date.now()
            });
        }

        const newPost = await Post.create({ user_id, title, content, tags, image, user_image: await (await User.findById(user_id)).avatar });

        // After creating the new post
        await User.findByIdAndUpdate(
            user_id,
            { $push: { posts: newPost._id } },
            { new: true, runValidators: true }
        );

        const user = await User.findById(user_id);
        console.log(user.followers)
        for (const followerId of user.followers) {
            await User.findOneAndUpdate(
                { username: followerId},
                { $push: { notifications: {postid : newPost._id, heading: title, content: content.substring(0, 100), timestamp: Date.now() }} },
                { new: true, runValidators: true }
            );
        }


        

        res.status(201).json({
            success: true,
            message: "Post created successfully",
            data: newPost,
            timestamp: Date.now()
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating post",
            error: error.message,
            timestamp: Date.now()
        });
    }
};

export const updatePost = async (req, res) => {
    try {
        const { postid } = req.params;
        const { title, content, tags } = req.body;

        // Validate postid format
        if (!postid.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({
                success: false,
                message: "Invalid post ID format",
                timestamp: Date.now()
            });
        }

        // Check if at least one field to update is provided
        if (!title && !content && !tags) {
            return res.status(400).json({
                success: false,
                message: "No update fields provided",
                timestamp: Date.now()
            });
        }

        const updatedPost = await Post.findByIdAndUpdate(
            postid, 
            { title, content, tags }, 
            { 
                new: true,
                runValidators: true
            }
        );

        if (!updatedPost) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
                timestamp: Date.now()
            });
        }

        res.status(200).json({
            success: true,
            message: "Post updated successfully",
            data: updatedPost,
            timestamp: Date.now()
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating post",
            error: error.message,
            timestamp: Date.now()
        });
    }
};

export const deletePost = async (req, res) => {
    try {
        const { postid } = req.params;
        const user_id = (req.headers.authorization)

        // Validate postid format
        if (!postid.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({
                success: false,
                message: "Invalid post ID format",
                timestamp: Date.now()
            });
        }

        const deletedPost = await Post.findByIdAndDelete(postid);

        if (!deletedPost) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
                timestamp: Date.now()
            });
        }

        // After deleting the post
        await User.findByIdAndUpdate(
            deletedPost.user_id,
            { $pull: { posts: deletedPost._id } },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            message: "Post deleted successfully",
            timestamp: Date.now()
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting post",
            error: error.message,
            timestamp: Date.now()
        });
    }
};


