import Post from '../../models/post.model.js';

// Increment post likes
export const incrementPostLike = async (req, res) => {
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
            { $inc: { likes_count: 1 } },
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
            message: 'Error adding like',
            error: error.message
        });
    }
};

// Decrement post likes
export const decrementPostLike = async (req, res) => {
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

        // Prevent likes from going below 0
        if (post.likes_count <= 0) {
            return res.status(400).json({
                status: 'fail',
                message: 'Post likes cannot be negative'
            });
        }

        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { $inc: { likes_count: -1 } },
            { 
                new: true,
                runValidators: true
            }
        );

        // Double-check if update was successful
        if (!updatedPost) {
            return res.status(500).json({
                status: 'error',
                message: 'Error updating like count'
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
            message: 'Error removing like',
            error: error.message
        });
    }
};
