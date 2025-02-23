import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    // Basic Information
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        trim: true,
        minlength: [3, "Username must be at least 3 characters long"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
    },
    
    // Profile Information
    firstname: {
        type: String,
        required: [true, "First name is required"],
        trim: true
    },
    lastname: {
        type: String,
        required: [true, "Last name is required"],
        trim: true
    },
    avatar: {
        type: String,
        default: "https://api.dicebear.com/7.x/avataaars/svg",
        get: function(url) {
            if (url.startsWith('http')) return url;
            return `${process.env.BACKEND_URL}/${url}`;
        }
    },
    title: {
        type: String,
        trim: true
    },
    bio: {
        type: String,
        trim: true,
        maxlength: [500, "Bio cannot be more than 500 characters"]
    },

    likedPosts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        default: []
    }],

    accountType: {
        type: String,
        enum: ['personal', 'business', 'admin'],
        default: 'personal'
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'suspended'],
        default: 'active'
    },
    visibility: {
        type: String,
        enum: ['public', 'private', 'connections'],
        default: 'public'
    },

    language: {
        type: String,
        default: 'en'
    },

    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }],

    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }],

    notifications: {
        type: Array,
        default: []
    },

    posts: {
        type: Array,
        default: []
    }

}, {
    timestamps: true
});

// Indexes
userSchema.index({ email: 1, username: 1 });
userSchema.index({ followers: 1 });
userSchema.index({ following: 1 });

const User = mongoose.model('User', userSchema);
export default User;