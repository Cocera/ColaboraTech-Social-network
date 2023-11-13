const express = require("express");
const PostController = require("../controllers/PostController");
const { isAuthor } = require("../middlewares/isAuthor");
const { authentication, isAdmin } = require("../middlewares/authentication");
const router = express.Router();

router.post("/", authentication, PostController.create);
router.get("/", authentication, PostController.findAll);
router.get("/id/:_id", authentication, PostController.findById);
router.put("/id/:_id", authentication, PostController.update);
router.delete("/id/_id", authentication, PostController.delete);

module.exports = router;