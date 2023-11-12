const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    bodyText: String,
    Post_id: Number,
    User_id: Number,
}, { timestamps: true });

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;