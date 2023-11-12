const Post = require("../models/Post.js");

const PostController = {

    async create(req, res) { // ADD USER AUTHENTICATION
        try {
            const post = await Post.create(req.body);
            res.status(201).send({message: "Post created successfully", post});
        } catch (error) {
            console.error(error);
            res.status(500).send({message: "Error during post creation", error})
        }
    },

    async findAll(req, res) {
        try {
            const posts = await Post.find();
            res.status(200).send(posts);
        } catch (error) {
            console.error(error);
            res.status(500).send(error)
        }
    },

    async findById(req, res) {
        try {
            const paramsId = req.params._id;
            const postById = await Post.findById(paramsId);
            if (!postById) {
                return res.status(400).send(`Id ${paramsId} not exists in DB`);
            };
            res.status(200).send({message: `Found post with id ${paramsId}`, postById});
        } catch (error) {
            console.error(error);
            res.status(500).send(error)
        }
    },

    async delete(req, res) {
        try {
            const paramsId = req.params._id;
            const post = await Post.findByIdAndDelete(paramsId);
            res.send({message: `Post with id ${paramsId} deleted`, post});
        } catch (error) {
            console.error(error);
            res.status(500).send({message: `Error trying to remove post with id ${paramsId}`, error});
        }
      }
};

module.exports = PostController;