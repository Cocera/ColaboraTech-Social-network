const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const CommentSchema = new mongoose.Schema({
    bodyText: String,
    postId: {
        type: ObjectId,
        ref: 'Post'
    },
    userId: {
        type: ObjectId,
        ref: 'User'
    },
}, { timestamps: true });

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;