const Post = require("../models/Post");
const Comment = require("../models/Comment");
const Response = require("../models/Response");

const isAuthorPost = async(req, res, next) => {
    try {
        const post = await Post.findById(req.params._id);
        if (post.userId.toString() !== req.user._id.toString()) { 
            return res.status(403).send({ message: `Post with id ${req.params._id} is not yours`});
        }
        next();
    } catch (error) {
        console.error(error)
        return res.status(500).send({ error, message: 'There was a problem verifying the authorship of the post'})
    }
};

const isAuthorComment = async(req, res, next) => {
    try {
        const comment = await Comment.findById(req.params._id);
        if (comment.userId.toString() !== req.user._id.toString()) { 
            return res.status(403).send({ message: `Comment with id ${req.params._id} is not yours`});
        }
        next();
    } catch (error) {
        console.error(error)
        return res.status(500).send({ error, message: 'There was a problem verifying the authorship of the comment'})
    }
};

const isAuthorResponse = async(req, res, next) => {
    try {
        const response = await Response.findById(req.params._id);
        if (response.userId.toString() !== req.user._id.toString()) { 
            return res.status(403).send({ message: `Response with id ${req.params._id} is not yours`});
        }
        next();
    } catch (error) {
        console.error(error)
        return res.status(500).send({ error, message: 'There was a problem verifying the authorship of the response'})
    }
};

module.exports = { isAuthorComment, isAuthorPost, isAuthorResponse };

