const express = require("express");
const router = express.Router();
const ProjectController = require("../controllers/ProjectController.js");
const {authentication} = require("../middlewares/authentication.js");
const {isAuthorProject} = require("../middlewares/isAuthor.js");

router.post("/", authentication, ProjectController.create);
router.put("/:_id", ProjectController.update);
router.delete("/:_id", authentication, isAuthorProject, ProjectController.delete);
router.get("/", ProjectController.getAll);
router.get("/title/:title", ProjectController.getProjectByName);
router.get("/:_id", ProjectController.getById);
router.post("/addFavorite/:_id", authentication, ProjectController.addFavorite);
router.post("/removeFavorite/:_id", authentication, ProjectController.removeFavorite);

module.exports = router;
