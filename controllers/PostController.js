const Post = require("../models/Post.js");
const User = require("../models/User.js");
const Comment = require("../models/Comment.js");

const PostController = {
    async create(req, res) {
        try {
            const post = await Post.create({...req.body, userId: req.user._id});
            await User.findByIdAndUpdate(
                req.user._id,
                {$push: {postId: post._id}},
                { new: true }
            );
            res.status(201).send({message: `${req.user.name} created post successfully`, post});
        } catch (error) {
            console.error(error);
            res
                .status(500)
                .send({message: "Error during post creation", error});
        }
    },

    async findAll(req, res) {
        try {
            const allPosts = await Post.find()
                .populate({ path: 'userId', select: 'name' })
                .populate({ path: 'likes', select: 'name' })
                .populate({ path: 'comments', select: 'bodyText', populate: {path: 'userId', select: 'name'}})
                .exec();
            res.status(200).send({
                allPosts
            });
        } catch (error) {
            console.error(error);
            res
                .status(500)
                .send(error);
        }
    },

    async findById(req, res) {
        try {
            if (!req.params._id.match(/^[0-9a-fA-F]{24}$/)) {
                return res
                    .status(400)
                    .send({message: "Invalid ID"});
            };
            const paramsId = req.params._id;
            const postById = await Post.findById({_id: req.params._id})
                .populate({ path: 'userId', select: 'name' })
                .populate({ path: 'likes', select: 'name' })
                .populate({ path: 'comments', select: 'bodyText', populate: {path: 'userId', select: 'name'}})
                .exec();
            if (!postById) {
                return res
                    .status(400)
                    .send(`Id ${req.params._id} not exists in DB`);
            };
            res
                .status(200)
                .send({message: `Found post`, postById});
        } catch (error) {
            console.error(error);
            res
                .status(500)
                .send(error);
        }
    },

    async getPostsByName(req, res) {
        try {
            const posts = await Post.find({
                $text: {
                    $search: req.params.text,
                }}
            );
            if (posts.length == 0) {
                return res.send({message: `No posts found with "${req.params.text}"`})
            };
            res.send(posts);
        } catch (error) {
          console.error(error);
          res.status(500).send(error);
        }
    },

    async update(req, res) {
        try {
            if (!req.params._id.match(/^[0-9a-fA-F]{24}$/)) {
                return res
                    .status(400)
                    .send({message: "Invalid ID"});
            };
            const post = await Post.findByIdAndUpdate(req.params._id, req.body, {new: true});
            if (!post) {
                return res.status(400).send(`Id ${req.params._id} not exists in DB`);
            };
            res.status(200).send({message: `Post with id ${req.params._id} updated`, post});
        } catch (error) {
            console.error(error);
            res
                .status(500)
                .send(error);
        }
    },

    async insertLike(req, res) {
        try {
            if (!req.params._id.match(/^[0-9a-fA-F]{24}$/)) {
                return res
                    .status(400)
                    .send({message: "Invalid ID"});
            };
            const post = await Post.findById(req.params._id);
            if (!post) {
                return res
                    .status(400)
                    .send(`Post does not exist in DB`);
            } else if (post.likes.includes(req.user._id)) {
                return res
                    .status(400)
                    .send({message: `${req.user.name} already liked this post`});
            } else {
                await Post.findByIdAndUpdate(req.params._id, {
                    $push: {
                        likes: req.user._id
                    }
                }, {new: true});
                await User.findByIdAndUpdate(req.user._id, {
                    $push: {
                        likedPosts: req.params._id
                    }
                }, {new: true});
            }
            res
                .status(201)
                .send({message: `${req.user.name} likes post with id: ${req.params._id}`});
        } catch (error) {
            console.error(error);
            res
                .status(500)
                .send(error);
        }
    },

    async deleteLike(req, res) {
        try {
            if (!req.params._id.match(/^[0-9a-fA-F]{24}$/)) {
                return res
                    .status(400)
                    .send({message: "Invalid ID"});
            }
            const likedPost = await Post.findById(req.params._id);
            if (!likedPost) {
                return res
                    .status(400)
                    .send(`Post does not exist in DB`);
            } else if (!likedPost.likes.includes(req.user._id)) {
                return res
                    .status(400)
                    .send({message: `${req.user.name} has to like post before unlike`});
            } else {
                await Post.findByIdAndUpdate(req.params._id, {
                    $pull: {
                        likes: req.user._id
                    }
                }, {new: true});
                await User.findByIdAndUpdate(req.user._id, {
                    $pull: {
                        likedPosts: req.params._id
                    }
                }, {new: true});
            }
            res
                .status(201)
                .send({message: `${req.user.name} does not like post with id: ${req.params._id} anymore`});
        } catch (error) {
            console.error(error);
            res
                .status(500)
                .send(error);
        }
    },

    async delete(req, res) {
        try {
            if (!req.params._id.match(/^[0-9a-fA-F]{24}$/)) {
                return res
                    .status(400)
                    .send({message: "Invalid ID"});
            }
            const postToDelete = await Post.findById(req.params._id);
            if (!postToDelete) {
                return res
                    .status(400)
                    .send(`Post with id ${req.params._id} not exists in DB`);
            };

            await Comment.deleteMany({postId: postToDelete._id});

            const userPullPost = await User.findByIdAndUpdate(
                postToDelete.userId,
                {$pull: {postId: postToDelete._id}},
                {new: true}
            );

            await Post.deleteOne({_id: req.params._id});

            res.status(200).send({message: `Post from ${userPullPost.name} with id ${req.params._id} deleted`});

        } catch (error) {
            console.error(error);
            res
                .status(500)
                .send({message: `Error trying to remove post with id ${req.params._id}`, error});
        }
    }
};

module.exports = PostController;
