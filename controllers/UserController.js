const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwt_secret = process.env.JWT_SECRET;
const transporter = require("../config/nodemailer");

const UserController = {
	async register(req, res, next) {
		try {
			const password = bcrypt.hashSync(req.body.password, 10);
			const user = await User.create({
				...req.body,
				password: password,
				confirmed: false,
			});
			const emailToken = jwt.sign(
				{
					email: req.body.email,
				},
				jwt_secret,
				{ expiresIn: "48h" }
			);
			const url = `http://localhost:8080/users/confirm/${emailToken}`;
			await transporter.sendMail({
				to: req.body.email,
				subject: "Please confirm your registration to ColaboraTech",
				html: `<body style="background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f6f6f6; width: 100%;" width="100%" bgcolor="#f6f6f6">
              <tr>
                <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
                <td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; max-width: 580px; padding: 10px; width: 580px; margin: 0 auto;" width="580" valign="top">
                  <div class="content" style="box-sizing: border-box; display: block; margin: 0 auto; max-width: 580px; padding: 10px;">
        
                    <table role="presentation" class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background: #ffffff; border-radius: 3px; width: 100%;" width="100%">
        
                      <tr>
                        <td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;" valign="top">
                          <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;" width="100%">
                            <tr>
                              <td align="center" style="font-family: sans-serif; font-size: 16px; vertical-align: top;" valign="top">
                                <h3 style="font-family: sans-serif; font-size: 24px; font-weight: bold; margin: 0; margin-bottom: 20px;">ColaboraTech</h3>
                              </td>
                            </tr>
                            <tr>
                              <td style="font-family: sans-serif; font-size: 16px; vertical-align: top;" valign="top">
                                <p style="font-family: sans-serif; font-size: 16px; font-weight: normal; margin: 0; margin-bottom: 15px;">Hi ${user.name},</p>
                                <p style="font-family: sans-serif; font-size: 16px; font-weight: normal; margin: 0; margin-bottom: 15px;">You're just one step away from joining Europe's #1 social network exclusively for the tech sector.
                                </p>
                                <p style="font-family: sans-serif; font-size: 16px; font-weight: normal; margin: 0; margin-bottom: 15px;">We empower junior talent, and connect you with experts in technology areas.</p>
                                <p style="font-family: sans-serif; font-size: 16px; font-weight: normal; margin: 0; margin-bottom: 20px;">Click below to confirm your email address:</p>
                                <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; box-sizing: border-box; width: 100%;" width="100%">
                                  <tbody>
                                    <tr>
                                      <td align="center" style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;" valign="top">
                                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: auto;">
                                          <tbody>
                                              <td style="font-family: sans-serif; font-size: 14px; vertical-align: top; border-radius: 5px; text-align: center; background-color: #427D9D; margin-bottom: 10px" valign="top" align="center" bgcolor="#427D9D"> <a href="${url}" target="_blank" style="border: solid 1px #427D9D; border-radius: 5px; box-sizing: border-box; cursor: pointer; display: inline-block; font-size: 14px; font-weight: bold; margin: 0; padding: 12px 25px; text-decoration: none; text-transform: capitalize; background-color: #427D9D; border-color: #427D9D; color: #ffffff;">Confirm email</a> </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
        
                    </table> 
        
                  </div>
                </td>
                <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
              </tr>
            </table>
          </body>`,
			});
			res
				.status(201)
				.send({
					message:
						"We've sent you an email to confirm your registration to ColaboraTech.",
					user,
				});
		} catch (error) {
			console.error(error);
			next(error);
		}
	},

	async confirm(req, res) {
		try {
			const token = req.params.emailToken;
			const payload = jwt.verify(token, jwt_secret);
			await User.findOneAndUpdate(
				{
					email: payload.email,
				},
				{
					$set: {
						confirmed: true,
					},
				},
				{ new: true }
			);
			res.status(201).send("User confirmed successfully.");
		} catch (error) {
			console.error(error);
			res.status(500).send({ message: "Error while confirming email.", error });
		}
	},

	async login(req, res) {
		try {
			const user = await User.findOne({ email: req.body.email });
			if (!user) {
				return res.status(400).send({ message: "User does not exist." });
			}
			if (!user.confirmed) {
				return res
					.status(400)
					.send({ message: "Please confirm your email address." });
			}

			const isMatch = bcrypt.compareSync(req.body.password, user.password);
			if (!isMatch) {
				return res
					.status(400)
					.send({ message: "Email or password is incorrect." });
			}

			const token = jwt.sign(
				{
					_id: user._id,
				},
				jwt_secret
			);
			if (user.tokens.length > 4) user.tokens.shift();
			user.tokens.push(token);
			await user.save();
			res.send({
				message: "Welcome " + user.name,
				token,
			});
		} catch (error) {
			console.error(error);
			res
				.status(500)
				.send({ message: "Error while trying to login user.", error });
		}
	},

	async addPicture(req, res) {
		try {
			const profilePicture = req.file;
			const user = await User.findByIdAndUpdate(
				req.user._id,
				{
					profilePicture: profilePicture.filename,
				},
				{ new: true }
			);
			console.log("user", user);
			res
				.status(200)
				.send({ message: "Profile picture uploaded successfully", user });
		} catch (error) {
			console.error(error);
			res
				.status(500)
				.send({ message: "Error while uploading profile picture.", error });
		}
	},

	async getCurrent(req, res) {
		try {
			const user = await User.findById(req.user._id);
			res.send({ message: "Your information:", user });
		} catch (error) {
			console.error(error);
			res
				.status(500)
				.send({
					message: "Error while getting current user information.",
					error,
				});
		}
	},

	async getByName(req, res) {
		try {
			const users = await User.find({
				$text: {
					$search: req.params.name,
				},
			});
			if (users.length == 0) {
				return res.send({ msg: "User not found." });
			}
			res.send(users);
		} catch (error) {
			console.error(error);
			res
				.status(500)
				.send({ message: "Error while getting user by name.", error });
		}
	},

	async getById(req, res) {
		try {
			const user = await User.findById(req.params._id);
			res.send(user);
		} catch (error) {
			console.error(error);
			res
				.status(500)
				.send({ message: "Error while getting user by id.", error });
		}
	},

	async getCurrentWithPostProjectFollowerCount(req, res) {
		try {
			const user = await User.findById(req.user._id)
				.populate("postId", "bodyText")
				.populate("projectId", "title");
			const followerCount = user.followers.length;
			const followingCount = user.following.length;
			res.send({
				message: "Your information:",
				user,
				followerCount,
				followingCount,
			});
		} catch (error) {
			console.error(error);
			res
				.status(500)
				.send({ message: "Error while getting user information.", error });
		}
	},

	async getCurrentWithPostProjectFollowers(req, res) {
		try {
			const user = await User.findById(req.user._id)
				.populate("postId", "bodyText")
				.populate("projectId", "title")
				.populate("followers", "name")
				.populate("following", "name")
				.populate("favProjects", "title");
			res.send({ message: "Your information: ", user });
		} catch (error) {
			console.error(error);
			res
				.status(500)
				.send({ message: "Error while getting user information.", error });
		}
	},

	async follow(req, res) {
		try {
			if (!req.params._id.match(/^[0-9a-fA-F]{24}$/)) {
				return res.status(400).send({ message: "Invalid ID." });
			}
			const userToFollow = await User.findById(req.params._id);
			if (!userToFollow) {
				return res.status(400).send(`User does not exist in DB.`);
			} else if (req.user.following.includes(userToFollow._id)) {
				return res
					.status(400)
					.send({ message: `You already follow ${userToFollow.name}.`, error });
			} else {
				await User.findByIdAndUpdate(
					req.user._id,
					{
						$push: {
							following: userToFollow._id,
						},
					},
					{ new: true }
				);
				await User.findByIdAndUpdate(
					userToFollow._id,
					{
						$push: {
							followers: req.user._id,
						},
					},
					{ new: true }
				);
			}
			res
				.status(201)
				.send({
					message: `${req.user.name} is now following ${userToFollow.name}.`,
				});
		} catch (error) {
			console.error(error);
			res.status(500).send({ message: "Error following user.", error });
		}
	},

	async unfollow(req, res) {
		try {
			if (!req.params._id.match(/^[0-9a-fA-F]{24}$/)) {
				return res.status(400).send({ message: "Invalid ID." });
			}
			const userToUnfollow = await User.findById(req.params._id);
			if (!userToUnfollow) {
				return res.status(400).send(`User does not exist in DB.`);
			} else if (!req.user.following.includes(userToUnfollow._id)) {
				return res
					.status(400)
					.send({
						message: `You are not following ${userToUnfollow.name}.`,
						error,
					});
			} else {
				await User.findByIdAndUpdate(
					req.user._id,
					{
						$pull: {
							following: userToUnfollow._id,
						},
					},
					{ new: true }
				);
				await User.findByIdAndUpdate(
					userToUnfollow._id,
					{
						$pull: {
							followers: req.user._id,
						},
					},
					{ new: true }
				);
			}
			res
				.status(201)
				.send({
					message: `${req.user.name} has unfollowed ${userToUnfollow.name}.`,
				});
		} catch (error) {
			console.error(error);
			res.status(500).send({ message: "Error unfollowing user.", error });
		}
	},

	async logout(req, res) {
		try {
			await User.findByIdAndUpdate(req.user._id, {
				$pull: {
					tokens: req.headers.authorization,
				},
			});
			res.send({ message: "Logged out successfully." });
		} catch (error) {
			console.error(error);
			res.status(500).send({ message: "Error while logging out user.", error });
		}
	},
};

module.exports = UserController;
