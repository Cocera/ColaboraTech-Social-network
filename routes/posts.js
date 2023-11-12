const express = require("express");
const PostController = require("../controllers/PostController");
const router = express.Router();

router.post("/", PostController.create);
router.get("/", PostController.findAll);
router.get("/id/:_id", PostController.findById);
router.put("/id/:_id", PostController.update);
router.delete("/id/_id", PostController.delete);

module.exports = router;