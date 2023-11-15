const express = require ("express");
const router = express.Router();
const TeamController = require("../controllers/TeamController.js");
const { authentication, isAdmin } = require("../middlewares/authentication.js");

router.put("/add-members/:_id", TeamController.addMembers);
router.put("/id/:_id", TeamController.update);
router.delete("/id/:_id", authentication, isAdmin, TeamController.delete);
router.get("/", TeamController.getAll);
router.get("/id/:_id", TeamController.getById);

module.exports = router;