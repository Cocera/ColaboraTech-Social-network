const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name."]
    },
    email: {
        type: String,
        match: [
            /.+\@.+\..+/, "Please enter a valid email."
        ],
        unique: true,
        required: [true, "Please enter an email address."]
    },
    password: {
        type: String,
        required: [true, "Please enter a password."]
    },
    role: {
        type: String,
        default: "user"
    },
    confirmed: Boolean,
    department: {
        type: String,
        enum: [
            "Web Development", "UX/UI", "Cybersecurity", "Data Science", "Project Management"
        ],
        required: [true, "Please enter a department."]
    },
    followers: [
        {
            type: ObjectId,
            ref: "User"
        }
    ],
    following: [
        {
            type: ObjectId,
            ref: "User"
        }
    ],
    postId: [
        {
            type: ObjectId,
            ref: "Post"
        }
    ],
    commentId: [
        {
            type: ObjectId,
            ref: "Comment"
        }
    ],
    likedPosts: [
        {
            type: ObjectId,
            ref: "Post"
        }
    ],
    favProjects: [
        {
            type: ObjectId,
            ref: "Project"
        }
    ],
    tokens: []
}, {timestamps: true});

UserSchema.index({name: "text"});

const User = mongoose.model("User", UserSchema);

module.exports = User;
