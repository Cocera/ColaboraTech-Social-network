const Post = require("../models/Post");
const Comment = require("../models/Comment");
const Team = require("../models/Team");

const isAuthorPost = async(req, res, next) => {
    try {
        const post = await Post.findById(req.params._id);
        if(req.user.role =="admin"){
            return next()
        }
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
        const comment = await Comment.findById(req.params.comment_id);
        if(req.user.role =="admin"){
            return next()
        }
        if (comment.userId.toString() !== req.user._id.toString()) { 
            return res.status(403).send({ message: `Comment with id ${req.params.comment_id} is not yours`});
        }
        next();
    } catch (error) {
        console.error(error)
        return res.status(500).send({ error, message: 'There was a problem verifying the authorship of the comment'})
    }
};


const isAuthorProject = async(req, res, next) => {
    try {
        const team = await Team.findById(req.params._id);
        if(req.user.role =="admin"){
            return next()
        }
        if (team.ProjectAdmin.toString() !== req.user._id.toString()) { 
            return res.status(403).send({ message: `${team.TeamName} is not yours`});
        } 
        next();
    } catch (error) {
        console.error(error)
        return res.status(500).send({ error, message: 'There was a problem verifying the authorship of the team'})
    }
};

module.exports = { isAuthorComment, isAuthorPost, isAuthorProject };

