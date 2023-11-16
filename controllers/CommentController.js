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

    async update(req, res) {
        try {
            if (!req.params.comment_id.match(/^[0-9a-fA-F]{24}$/)) {
                return res.status(400).send({message: 'Invalid ID'});
            };
            const commentToUpdate = await Comment.findByIdAndUpdate(
                req.params.comment_id,
                req.body,
                { new: true }
            );
            if (!commentToUpdate) {
                return res.status(400).send(`Id ${req.params._id} not exists in DB`);
            };
            res.status(200).send({message: `Comment with id ${req.params.comment_id} updated`, bodyText: commentToUpdate.bodyText});
        } catch (error) {
            console.error(error);
            res.status(500).send(error)
        }
    },

    async insertLike(req, res) {
        try {
            if (!req.params.comment_id.match(/^[0-9a-fA-F]{24}$/)) {
                return res.status(400).send({message: 'Invalid ID'});
            };
            const comment = await Comment.findById(req.params.comment_id);
            if (!comment) {
                return res.status(400).send(`Comment does not exist in DB`);
            } else if (comment.likes.includes(req.user.comment_id)) {
                return res.status(400).send({message: `${req.user.name} already liked this post`});
            } else {
                await Comment.findByIdAndUpdate(
                    req.params._id,
                    {$push: {likes: req.user._id}},
                    {new: true}
                );
            };
            res.status(201).send({message: `${req.user.name} likes comment with id: ${req.params.comment_id}`});
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },

    async deleteLike(req, res) {
        try {
            if (!req.params.comment_id.match(/^[0-9a-fA-F]{24}$/)) {
                return res.status(400).send({message: 'Invalid ID'});
            };
            const likedComment = await Post.findById(req.params.comment_id);
            if (!likedPost) {
                return res.status(400).send(`Post does not exist in DB`);
            } else if (!likedComment.likes.includes(req.user.comment_id)) {
                return res.status(400).send({message: `${req.user.name} has to like comment before unlike`});
            } else {
                await Comment.findByIdAndUpdate(
                    req.params.comment_id,
                    {$pull: {likes: req.user._id}},
                    {new: true}
                );
            };
            res.status(201).send({message: `${req.user.name} does not like comment with id: ${req.params.comment_id} anymore`});
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    },

    async delete(req, res) {
        try {
            if (!req.params._id.match(/^[0-9a-fA-F]{24}$/)) {
                return res.status(400).send({message: 'Invalid ID'});
            };
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
};

module.exports = CommentController;