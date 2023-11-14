const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const ResponseSchema = new mongoose.Schema({
    bodyText: String,
    likeIds: [{
        type: ObjectId,
        ref: 'User'
    }],
    userId: {
        type: ObjectId,
        ref: 'User'
    },
    commentId: {
        type: ObjectId,
        ref: 'Comment'
    },
}, { timestamps: true });

const Response = mongoose.model('Response', ResponseSchema);

module.exports = Response;