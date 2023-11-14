const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const {authentication, isAdmin} = require("../middlewares/authentication");

router.post("/", UserController.register);
router.post("/login", UserController.login);
router.get("/confirm/:emailToken", UserController.confirm);
router.get("/myInfo", authentication, UserController.getCurrent);
router.delete("/logout", authentication, UserController.logout);

module.exports = router;
