const Comment = require("../models/Comment.js");

const CommentController = {
    
    async create(req, res) { // ADD USER AUTHENTICATION AND ADD USER ID THROUGH HIS TOKEN ID
        try {
            postId = req.params._id;
            const comment = await Comment.create({...req.body, Post_id: postId});
            res.status(201).send({message: `Comment created successfully in post ${postId}`});
        } catch (error) {
            console.error(error);
            res.status(500).send({message: "Error when creating comment", error})
        }
    },

    async delete(req, res) {
        try {
            const paramsId = req.params._id;
            const commentById = await Comment.findById(paramsId);
            if (!postById) {
                return res.status(400).send(`Comment with id ${paramsId} not exists in DB`);
            };
            const post = await Post.findByIdAndDelete(paramsId);
            res.send({message: `Comment with id ${paramsId} deleted`});
        } catch (error) {
            console.error(error);
            res.status(500).send({message: `Error trying to remove comment with id ${paramsId}`, error});
        }
      }

      // Crear middleware de ID check par ano repetir codigo cada vez qu enos pasen un id concreto por params

};

module.exports = CommentController;