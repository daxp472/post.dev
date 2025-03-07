import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    user_id: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: "User",
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }

}, {timestamps : true});

const postSchema = new mongoose.Schema({
    user_id: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: "User",
        type : String,
        required : true
    },
    user_image: {
        type : String,
        default : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
    },
    provider: {
        type: String,
        default : "POST.dev"
    },
    image : {
        type : String,
        default : ""
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    likes_count: {
        type : Number,
        default : 0
    },
    bookmarks_count: {
        type : Number,
        default : 0
    },
    shares_count: {
        type : Number,
        default : 0
    },
    visiblity: {
        type: String,
        enum: ["public", "private"],
        default: "public"
    },
    tags: {
        Type: Array
    },
    comments: [
        commentSchema
    ]
}, {timestamps : true});

 const Post = mongoose.model("Post", postSchema);
 export default Post;