import Post from "../../models/post.model.js";

// Add bookmark to post
export const addBookmark = async (req, res) => {
    try {
        const postId = req.params.postId;

        // Validate postId format
        if (!postId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({
                status: 'fail',
                message: 'Invalid post ID format'
            });
        }

        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { $inc: { bookmarks_count: 1 } },
            { 
                new: true,
                runValidators: true
            }
        );

        if (!updatedPost) {
            return res.status(404).json({
                status: 'fail',
                message: 'Post not found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                post: updatedPost
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error adding bookmark',
            error: error.message
        });
    }
};

// Remove bookmark from post
export const removeBookmark = async (req, res) => {
    try {
        const postId = req.params.postId;

        // Validate postId format
        if (!postId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({
                status: 'fail',
                message: 'Invalid post ID format'
            });
        }

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({
                status: 'fail',
                message: 'Post not found'
            });
        }

        // Prevent bookmarks from going below 0
        if (post.bookmarks_count <= 0) {
            return res.status(400).json({
                status: 'fail',
                message: 'Post bookmarks cannot be negative'
            });
        }

        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { $inc: { bookmarks_count: -1 } },
            { 
                new: true,
                runValidators: true
            }
        );

        // Double-check if update was successful
        if (!updatedPost) {
            return res.status(500).json({
                status: 'error',
                message: 'Error updating bookmark count'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                post: updatedPost
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error removing bookmark',
            error: error.message
        });
    }
};

