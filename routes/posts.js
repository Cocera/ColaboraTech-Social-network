const express = require("express");
const PostController = require("../controllers/PostController");
const { isAuthor } = require("../middlewares/authentication");
const router = express.Router();

router.post("/", PostController.create);
router.get("/", PostController.findAll);
router.get("/id/:_id", PostController.findById);
router.put("/id/:_id", isAuthor, PostController.update);
router.delete("/id/_id", isAuthor, PostController.delete);

module.exports = router;