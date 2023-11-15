const express = require ("express");
const ResponseController = require("../controllers/ResponseController.js");
const { isAuthorResponse } = require("../middlewares/isAuthor");
const { authentication, isAdmin } = require("../middlewares/authentication");
const router = express.Router();

// ADD response routes to endpoints

module.exports = router;