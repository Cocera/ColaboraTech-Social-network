const express = require("express");
const CommentController = require("../controllers/CommentController");
const router = express.Router();

router.post("/comment/:_id", CommentController.create);

module.exports = router;