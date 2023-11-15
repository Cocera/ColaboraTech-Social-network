const express = require("express");
const CommentController = require("../controllers/CommentController");
const { isAuthorComment } = require("../middlewares/isAuthor");
const { authentication, isAdmin } = require("../middlewares/authentication");
const router = express.Router();

router.post("/comment/:_id", authentication, CommentController.create);
router.delete("/comment/:_id", authentication, CommentController.delete);

module.exports = router;