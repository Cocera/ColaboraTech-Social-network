const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    bodyText: String,
    asset: String,
    likes: Array,
    User_id: Number,
}, { timestamps: true });

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;