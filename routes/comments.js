const express = require("express");
const CommentController = require("../controllers/CommentController");
const { isAuthor } = require("../middlewares/authentication");
const router = express.Router();

router.post("/comment/:_id", isAuthor, CommentController.create);
router.delete("/comment/:_id", isAuthor, CommentController.delete);

module.exports = router;