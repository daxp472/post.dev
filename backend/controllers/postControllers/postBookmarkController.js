import Post from "../../models/post.model.js";

// Add bookmark to post
export const addBookmark = async (req, res) => {
    const postId = req.params.postId;

    const updatedPost = await Post.findByIdAndUpdate(
        postId,
        { $inc: { bookmarks_count: 1 } }, // Increment bookmarks by 1
        { new: true }
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

// Remove bookmark from post
export const removeBookmark = async (req, res) => {
    const postId = req.params.postId;

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
        { $inc: { bookmarks_count: -1 } }, // Decrement bookmarks by 1
        { new: true }
    );

    res.status(200).json({
        status: 'success',
        data: {
            post: updatedPost
        }
    });
};

