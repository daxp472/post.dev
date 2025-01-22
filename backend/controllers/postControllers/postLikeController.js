import Post from '../../models/post.model.js';

// Increment post likes
export const incrementPostLike = async (req, res) => {
    const postId = req.params.postId;

    const updatedPost = await Post.findByIdAndUpdate(
        postId,
        { $inc: { likes: 1 } }, // Increment likes by 1
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
