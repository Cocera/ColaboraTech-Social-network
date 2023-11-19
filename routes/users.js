const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const { authentication } = require("../middlewares/authentication");
const upload = require("../middlewares/multer");

router.post("/", UserController.register);
router.post("/login", UserController.login);
router.get("/confirm/:emailToken", UserController.confirm);
router.put(
	"/uploadProfilePic",
	authentication,
	upload.single("profilePicture"),
	UserController.addPicture
);
router.get("/myBasicInfo", authentication, UserController.getCurrent);
router.get(
	"/myInfoWithPosts",
	authentication,
	UserController.getCurrentWithPostProjectFollowerCount
);
router.get(
	"/myExtendedInfo",
	authentication,
	UserController.getCurrentWithPostProjectFollowers
);
router.get("/:_id", UserController.getById);
router.get("/name/:name", UserController.getByName);
router.put("/follow/:_id", authentication, UserController.follow);
router.put("/unfollow/:_id", authentication, UserController.unfollow);
router.delete("/logout", authentication, UserController.logout);

module.exports = router;
