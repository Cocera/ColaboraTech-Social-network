const express = require("express");
const CommentController = require("../controllers/CommentController");
const { isAuthorComment } = require("../middlewares/isAuthor");
const { authentication, isAdmin } = require("../middlewares/authentication");
const router = express.Router();

router.post("/id/:post_id", authentication, CommentController.create);
router.put("/update/:comment_id", authentication, isAuthorComment, CommentController.update);
router.put("/like/:comment_id", authentication, CommentController.insertLike); // CHECK POSTMAN
router.put("/unlike/:comment_id", authentication, CommentController.deleteLike); // CHECK POSTMAN
router.delete("/id/:_id", authentication, CommentController.delete);

module.exports = router;