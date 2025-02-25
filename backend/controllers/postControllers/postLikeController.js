import Post from '../../models/post.model.js';
import User from '../../models/user.model.js';

// Increment post likes
export const incrementPostLike = async (req, res) => {
    try {
        const postId = req.params.postId;
        // This contain the user id ---
        let user_id = req.user;

        // Validate postId format
        if (!postId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({
                status: 'fail',
                message: 'Invalid post ID format'
            });
        }

        let updatedPost = await Post.findById(
            postId
        );

        if(!(await User.findOne({ _id: user_id })).likedPosts.includes(postId)) {
            await User.findOneAndUpdate(
                { _id: user_id },
                { $push: { likedPosts: postId } },
                { new: true, runValidators: true }
            );

            updatedPost = await Post.findByIdAndUpdate(
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

        const user_id = req.user;

        // Validate postId format
        if (!postId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({
                status: 'fail',
                message: 'Invalid post ID format'
            });
        }

        const post = await Post.findById(postId);

        const user = await User.findByIdAndUpdate(
            user_id,
            { $pull: { likedPosts: postId } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not found'
            });
        }

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

        let updatedPost = await Post.findByIdAndUpdate(
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

