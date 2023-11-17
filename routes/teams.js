const express = require ("express");
const router = express.Router();
const TeamController = require("../controllers/TeamController.js");
const { authentication, isAdmin, } = require("../middlewares/authentication.js");
const { isAuthorProject } = require("../middlewares/isAuthor.js");


router.put("/addMembers/:_id", authentication,isAuthorProject,TeamController.addMembers);
router.put("/removeMembers/:_id", authentication,isAuthorProject, TeamController.removeMembers)
router.put("/id/:_id", TeamController.update);
router.delete("/id/:_id", authentication, isAuthorProject, TeamController.delete);
router.get("/", TeamController.getAll);
router.get("/id/:_id", TeamController.getById);

module.exports = router;