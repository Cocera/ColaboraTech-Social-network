const express = require("express");
const PostController = require("../controllers/PostController");
const { isAuthorPost } = require("../middlewares/isAuthor");
const { authentication, isAdmin } = require("../middlewares/authentication");
const router = express.Router();

router.post("/", authentication, PostController.create);
router.get("/", authentication, PostController.findAll);
router.get("/id/:_id", authentication, PostController.findById);
router.put("/id/:_id", authentication, isAuthorPost, PostController.update);
router.put("/like/:_id", authentication, PostController.insertLike);
router.put("/unlike/:_id", authentication, PostController.deleteLike);
router.delete("/id/:_id", authentication, isAuthorPost, PostController.delete);

module.exports = router;