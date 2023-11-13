const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const PostSchema = new mongoose.Schema({
    bodyText: String,
    asset: String,
    likes: [{
        type: ObjectId,
        ref: 'User'
    }],
    userId: {
        type: ObjectId,
        ref: 'User'
    },
}, { timestamps: true });

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;