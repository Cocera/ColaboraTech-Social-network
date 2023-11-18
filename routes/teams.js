const express = require("express");
const router = express.Router();
const TeamController = require("../controllers/TeamController.js");
const {authentication} = require("../middlewares/authentication.js");
const {isAuthorProject} = require("../middlewares/isAuthor.js");

router.put("/addMembers/:_id", authentication, isAuthorProject, TeamController.addMembers);
router.put("/removeMembers/:_id", authentication, isAuthorProject, TeamController.removeMembers);
router.get("/", TeamController.getAll);

module.exports = router;
