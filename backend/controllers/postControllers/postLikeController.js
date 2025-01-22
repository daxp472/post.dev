import Post from '../../models/post.model.js';

// Increment post likes
export const incrementPostLike = async (req, res) => {
    const postId = req.params.postId;

    const updatedPost = await Post.findByIdAndUpdate(
        postId,
        { $inc: { likes_count: 1 } }, // Increment likes by 1
        { new: true } // Return updated document
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
};

// Decrement post likes
export const decrementPostLike = async (req, res) => {
    const postId = req.params.postId;

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
        { $inc: { likes_count: -1 } }, // Decrement likes by 1
        { new: true }
    );

    res.status(200).json({
        status: 'success',
        data: {
            post: updatedPost
        }
    });
};
