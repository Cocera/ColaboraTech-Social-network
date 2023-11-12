const express = require ("express");
const ProjectController = require("../controllers/ProjectController");
const router = express.Router();

router.post("/", ProjectController.create);
router.put("/id/:_id", ProjectController.update);
router.delete("/id/:_id",ProjectController.delete);
router.get("/", ProjectController.getAll);
router.get("/name/:name",ProjectController.getProjectByName);
router.get("/id/:_id", ProjectController.getById);

module.exports = router;