const express = require("express");
const CommentController = require("../controllers/CommentController");
const { isAuthorComment } = require("../middlewares/isAuthor");
const { authentication, isAdmin } = require("../middlewares/authentication");
const router = express.Router();

router.post("/id/:post_id", authentication, CommentController.create);
router.delete("/id/:_id", authentication, CommentController.delete);

module.exports = router;