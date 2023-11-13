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
    department: {
        type: String,
        enum: ["Web Development", "UX/UI", "Cybersecurity", "Data Science", "Project Management"]
    },
    followers: [
        {
            type: ObjectId,
            ref: "User"
        }
    ],
    tokens: []
}, {timestamps: true});

const User = mongoose.model("User", UserSchema);

module.exports = User;
