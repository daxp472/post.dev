import Post from "../../models/post.model.js";

// Create a new comment
export const addComment = async (req, res) => {
    try {
        const { postId } = req.params;
        const { user_id, content } = req.body;

        // Validate required fields with more robust checks
        if (!user_id || typeof user_id !== 'string' || user_id.trim() === '') {
            return res.status(400).json({
                success: false,
                message: "Invalid or missing user ID",
                details: {
                    user_id: user_id ? "✗ invalid" : "✗ required",
                    content: content ? "✓" : "✗ required"
                },
                timestamp: Date.now()
            });
        }

        if (!content || typeof content !== 'string' || content.trim() === '') {
            return res.status(400).json({
                success: false,
                message: "Invalid or missing comment content",
                timestamp: Date.now()
            });
        }

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
                timestamp: Date.now()
            });
        }

        // Normalize user_id to ensure it's a valid string
        const normalizedUserId = user_id.trim();

        // Add new comment with normalized user ID
        post.comments.push({ 
            user_id: normalizedUserId, 
            content: content.trim() 
        });
        
        // Save the post with the new comment
        const updatedPost = await post.save();

        res.status(201).json({
            success: true,
            message: "Comment added successfully",
            data: updatedPost.comments[updatedPost.comments.length - 1],
            timestamp: Date.now()
        });
    } catch (error) {
        console.error("Comment addition error:", error);
        res.status(500).json({
            success: false,
            message: "Error adding comment",
            error: error.message || "Unknown error occurred",
            timestamp: Date.now()
        });
    }
};

// Get all comments for a post
export const getComments = async (req, res) => {
    try {
        const { postId } = req.params;

        // Validate postId format
        if (!postId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({
                success: false,
                message: "Invalid post ID format",
                timestamp: Date.now()
            });
        }

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
                timestamp: Date.now()
            });
        }

        if (!post.comments || post.comments.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No comments found for this post",
                timestamp: Date.now()
            });
        }

        res.status(200).json({
            success: true,
            message: "Comments fetched successfully",
            data: post.comments,
            count: post.comments.length,
            timestamp: Date.now()
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching comments",
            error: error.message,
            timestamp: Date.now()
        });
    }
};

// Update a comment
export const updateComment = async (req, res) => {
    try {
        const { postId, commentId } = req.params;
        const { content } = req.body;

        // Validate content
        if (!content) {
            return res.status(400).json({
                success: false,
                message: "Comment content is required",
                timestamp: Date.now()
            });
        }

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
                timestamp: Date.now()
            });
        }

        const comment = post.comments.id(commentId);

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found",
                timestamp: Date.now()
            });
        }

        // Update comment content only - updatedAt will be handled automatically
        comment.content = content;
        await post.save();

        res.status(200).json({
            success: true,
            message: "Comment updated successfully",
            data: comment,
            timestamp: Date.now()
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating comment",
            error: error.message,
            timestamp: Date.now()
        });
    }
};

// Delete a comment
export const deleteComment = async (req, res) => {
    try {
        const { postId, commentId } = req.params;

        // Validate postId format
        if (!postId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({
                success: false,
                message: "Invalid post ID format",
                timestamp: Date.now()
            });
        }

        const post = await Post.findByIdAndUpdate(
            postId,
            { $pull: { comments: { _id: commentId } } },
            { new: true }
        );

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
                timestamp: Date.now()
            });
        }

        res.status(200).json({
            success: true,
            message: "Comment deleted successfully",
            timestamp: Date.now()
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting comment",
            error: error.message,
            timestamp: Date.now()
        });
    }
};