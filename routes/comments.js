const express = require("express");
const CommentController = require("../controllers/CommentController");
const { isAuthor } = require("../middlewares/isAuthor");
const { authentication, isAdmin } = require("../middlewares/authentication");
const router = express.Router();

router.post("/comment/:_id", CommentController.create);
router.delete("/comment/:_id", CommentController.delete);

module.exports = router;