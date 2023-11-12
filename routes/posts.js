const express = require("express");
const PostController = require("../controllers/PostController");
const router = express.Router();

router.post("/", PostController.create);
router.get("/", PostController.findAll);
router.get("/id/:_id", PostController.findById);

module.exports = router;