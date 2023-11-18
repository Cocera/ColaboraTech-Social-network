const Comment = require("../models/Comment.js");
const Post = require("../models/Post.js");

const CommentController = {
    async create(req, res) {
        try {
            const comment = await Comment.create({
                ...req.body,
                postId: req.params.post_id,
                userId: req.user._id
            });
            await Post.findByIdAndUpdate(req.params.post_id, {
                $push: {
                    comments: comment._id
                }
            }, {new: true});
            res
                .status(201)
                .send({message: `Comment created successfully in post with id: ${req.params.post_id}`, bodyText: comment.bodyText});
        } catch (error) {
            console.error(error);
            res
                .status(500)
                .send({message: "Error when creating comment", error});
        }
    },

    async update(req, res) {
        try {
            if (!req.params.comment_id.match(/^[0-9a-fA-F]{24}$/)) {
                return res
                    .status(400)
                    .send({message: "Invalid ID"});
            }
            const commentToUpdate = await Comment.findByIdAndUpdate(req.params.comment_id, req.body, {new: true});
            if (!commentToUpdate) {
                return res
                    .status(400)
                    .send(`Id ${req.params._id} not exists in DB`);
            }
            res
                .status(200)
                .send({message: `Comment with id ${req.params.comment_id} updated`, bodyText: commentToUpdate.bodyText});
        } catch (error) {
            console.error(error);
            res
                .status(500)
                .send(error);
        }
    },

    async insertLike(req, res) {
        try {
            if (!req.params.comment_id.match(/^[0-9a-fA-F]{24}$/)) {
                return res
                    .status(400)
                    .send({message: "Invalid ID"});
            }
            const comment = await Comment.findById(req.params.comment_id);
            if (!comment) {
                return res
                    .status(400)
                    .send(`Comment does not exist in DB`);
            } else if (comment.likes.includes(req.user.comment_id)) {
                return res
                    .status(400)
                    .send({message: `${req.user.name} already liked this post`});
            } else {
                await Comment.findByIdAndUpdate(req.params.comment_id, {
                    $push: {
                        likes: req.user._id
                    }
                }, {new: true});
            }
            res
                .status(201)
                .send({message: `${req.user.name} likes comment with id: ${req.params.comment_id}`});
        } catch (error) {
            console.error(error);
            res
                .status(500)
                .send(error);
        }
    },

    async deleteLike(req, res) {
        try {
            if (!req.params.comment_id.match(/^[0-9a-fA-F]{24}$/)) {
                return res
                    .status(400)
                    .send({message: "Invalid ID"});
            }
            const likedComment = await Comment.findById(req.params.comment_id);
            if (!likedComment) {
                return res
                    .status(400)
                    .send(`Post does not exist in DB`);
            } else if (!likedComment.likes.includes(req.user._id)) {
                return res
                    .status(400)
                    .send({message: `${req.user.name} has to like comment before unlike`});
            } else {
                await Comment.findByIdAndUpdate(req.params.comment_id, {
                    $pull: {
                        likes: req.user._id
                    }
                }, {new: true});
            }
            res
                .status(201)
                .send({message: `${req.user.name} does not like comment with id: ${req.params.comment_id} anymore`});
        } catch (error) {
            console.error(error);
            res
                .status(500)
                .send(error);
        }
    },

    async delete(req, res) {
        try {
            if (!req.params.comment_id.match(/^[0-9a-fA-F]{24}$/)) {
                return res
                    .status(400)
                    .send({message: "Invalid ID"});
            }
            const commentById = await Comment.findById(req.params.comment_id);
            if (!commentById) {
                return res
                    .status(400)
                    .send(`Comment with id ${req.params.comment_id} not exists in DB`);
            }

            await Post.findByIdAndUpdate(commentById.postId, {
                $pull: {
                    comments: req.params.comment_id
                }
            }, {new: true});

            await Comment.findOneAndDelete(req.params.comment_id);

            res.send({message: `${req.user.name}'s comment with id ${req.params.comment_id} deleted`});
        } catch (error) {
            console.error(error);
            res
                .status(500)
                .send({message: `Error trying to remove comment with id ${req.params.comment_id}`, error});
        }
    }
};

module.exports = CommentController;
