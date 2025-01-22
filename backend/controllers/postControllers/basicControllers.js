import Post from "../../models/post.model.js";

export const postRouteEntry = (req, res) => {
    res.send("Hello This is the post api by POST.dev");
}

export const getAllPosts = async (req, res) => {
    try {
        const allPosts = await Post.find();
        res.status(200).json({
            success : true,
            message : "Posts fetched successfully",
            data : allPosts,
            timestamp : Date.now()
        });
    } catch (error) {
        res.status(500).json({
            success : false,
            message : "Internal Server Error",
            error : error.message,
            timestamp : Date.now()
        });
    }
}

export const createNewPost = async (req, res) => {
    try {
        const { user_id, title, content, tags } = req.body;
        const newPost = await Post.create({ user_id, title, content, tags })
        res.status(201).json({
            success : true,
            message : "Post created successfully",
            data : newPost,
            timestamp : Date.now()
        });
    } catch (error) {
        res.status(500).json({
            success : false,
            message : "Internal Server Error",
            error : error.message,
            timestamp : Date.now()
        });
    }
}

export const updatePost = async (req, res) => {
    try {
        const { postid } = req.params;

        const {title, content, tags } = req.body;
        const updatedPost = await Post.findByIdAndUpdate(postid, { title, content, tags }, { new: true });
        res.status(200).json({
            success : true,
            message : "Post updated successfully",
            data : updatedPost,
            timestamp : Date.now()
        });
    } catch (error) {
        res.status(500).json({
            success : false,
            message : "Internal Server Error",
            error : error.message,
            timestamp : Date.now()
        });
    }
}

export const deletePost = async (req, res) => {
    try {
        const { postid } = req.params;
        await Post.findByIdAndDelete(postid);
        res.status(200).json({
            success : true,
            message : "Post deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success : false,
            message : "Internal Server Error",
            error : error.message,
            timestamp : Date.now()
        });
    }
}


