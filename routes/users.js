const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const {authentication, isAdmin} = require("../middlewares/authentication");

router.post("/", UserController.register);
router.post("/login", UserController.login);
router.get("/confirm/:emailToken", UserController.confirm);
router.get("/myInfo", authentication, UserController.getCurrent);
router.get("/id/:_id", UserController.getById);
router.get("/name/:name", UserController.getByName);
router.put("/follow/:_id", authentication, UserController.follow);
router.put("/unfollow/:_id", authentication, UserController.unfollow);
router.delete("/logout", authentication, UserController.logout);

module.exports = router;
