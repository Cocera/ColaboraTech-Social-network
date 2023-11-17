const express = require("express");
const router = express.Router();
const TeamInvitationController = require("../controllers/TeamInvitationController.js");
const {authentication} = require("../middlewares/authentication.js");
const {isAuthorProject} = require("../middlewares/isAuthor.js");

router.post("/project/:_id/user/:userId", authentication, isAuthorProject, TeamInvitationController.sendInvitation);
router.get("/acceptInvitation/:emailToken", TeamInvitationController.response);
router.get("/declineInvitation/:emailToken", TeamInvitationController.response);

module.exports = router;
