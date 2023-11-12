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
            const postById = await Post.findById(req.params._id);
            if (!postById) {
                return res.status(400).send(`Id ${req.params._id} not exists in DB`);
            };
            res.status(200).send({message: `Found post with id ${req.params._id}`, postById});
        } catch (error) {
            console.error(error);
            res.status(500).send(error)
        }
    }
};

module.exports = PostController;