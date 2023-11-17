const express = require("express");
const CommentController = require("../controllers/CommentController");
const {isAuthorComment} = require("../middlewares/isAuthor");
const {authentication} = require("../middlewares/authentication");
const router = express.Router();

router.post("/:post_id", authentication, CommentController.create);
router.put("/:comment_id", authentication, isAuthorComment, CommentController.update);
router.put("/like/:comment_id", authentication, CommentController.insertLike);
router.put("/unlike/:comment_id", authentication, CommentController.deleteLike);
router.delete("/:comment_id", authentication, CommentController.delete);

module.exports = router;
