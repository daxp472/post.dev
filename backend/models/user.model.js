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
        default: "default-avatar.png"
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

    followers: {
        type : Array,
        default : []
    },
    followers_count: {
        type : Number,
        default : 0
    },

    following: {
        type : Array,
        default : []
    },

    following_count: {
        type : Number,
        default : 0
    },

    notifications : {
        type : Array,
        default : []
    },

    posts : {
        type : Array,
        default : []
    }

    
}, {
    timestamps: true
});

// Indexes
userSchema.index({ email: 1, username: 1 });

const User = mongoose.model('User', userSchema);
export default User;
