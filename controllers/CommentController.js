const Comment = require("../models/Comment.js");
const Post = require("../models/Post.js");

const CommentController = {
    async create(req, res) {
        try {
            const comment = await Comment.create({...req.body, postId: req.params.post_id, userId: req.user._id});
            await Post.findByIdAndUpdate(
                req.params.post_id,
                {$push: {comments: comment._id}},
                {new: true}
            );
            res.status(201).send({message: `Comment created successfully in post with id: ${req.params.post_id}`, bodyText: comment.bodyText});
        } catch (error) {
            console.error(error);
            res.status(500).send({message: "Error when creating comment", error})
        }
    },

    async delete(req, res) {
        try {
            const commentById = await Comment.findById(req.params._id);
            if (!postById) {
                return res.status(400).send(`Comment with id ${req.params._id} not exists in DB`);
            };
            const post = await Post.findByIdAndDelete(req.params._id);
            res.send({message: `Comment with id ${req.params._id} deleted`});
        } catch (error) {
            console.error(error);
            res.status(500).send({message: `Error trying to remove comment with id ${req.params._id}`, error});
        }
      }

      // Crear middleware de ID check par ano repetir codigo cada vez qu enos pasen un id concreto por params

};

module.exports = CommentController;