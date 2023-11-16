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
                confirmed: false
            });
            const emailToken = jwt.sign({
                email: req.body.email
            }, jwt_secret, {expiresIn: "48h"});
            const url = "http://localhost:8080/users/confirm/" + emailToken;
            await transporter.sendMail({to: req.body.email, subject: "Please confirm your registration to ColaboraTech", html: `<h3> Welcome, you're just a step away from joining our tech community!  </h3>
                <a href="${url}"> Click here to confirm your email address</a>
                `});
            res
                .status(201)
                .send({message: "We've sent you an email to confirm your registration to ColaboraTech.", user});
        } catch (error) {
            console.error(error);
            next(error);
        }
    },

    async confirm(req, res) {
        try {
            const token = req.params.emailToken;
            const payload = jwt.verify(token, jwt_secret);
            await User.findOneAndUpdate({
                email: payload.email
            }, {
                $set: {
                    confirmed: true
                }
            }, {new: true});
            res
                .status(201)
                .send("User confirmed successfully.");
        } catch (error) {
            console.error(error);
        }
    },

    async login(req, res) {
        try {
            const user = await User.findOne({email: req.body.email});
            if (!user) {
                return res
                    .status(400)
                    .send({message: "User does not exist."});
            }
            if (!user.confirmed) {
                return res
                    .status(400)
                    .send({message: "Please confirm your email address."});
            }

            const isMatch = bcrypt.compareSync(req.body.password, user.password);
            if (!isMatch) {
                return res
                    .status(400)
                    .send({message: "Email or password is incorrect."});
            }

            const token = jwt.sign({
                _id: user._id
            }, jwt_secret);
            if (user.tokens.length > 4) 
                user.tokens.shift();
            user
                .tokens
                .push(token);
            await user.save();
            res.send({
                message: "Welcome " + user.name,
                token
            });
        } catch (error) {
            console.error(error);
        }
    },

    async getCurrent(req, res) {
        try {
            const user = await User.findById(req.user._id);
            res.send({message: "Your information: ", user});
        } catch (error) {
            console.error(error);
        }
    },

    async getByName(req, res) {
        try {
            const users = await User.find({
                $text: {
                    $search: req.params.name
                }
            });
            if (users.length == 0) {
                return res.send({msg: "User not found."});
            }
            res.send(users);
        } catch (error) {
            console.error(error);
        }
    },

    async getById(req, res) {
        try {
            const user = await User.findById(req.params._id);
            res.send(user);
        } catch (error) {
            console.error(error);
        }
    },

    async getCurrentWithPostProjectFollowerCount(req, res) {
        try {
            const user = await User
                .findById(req.user._id)
                .populate("postId", "bodyText")
                .populate("projectId", "title");
            const followerCount = user.followers.length;
            const followingCount = user.following.length;
            res.send({message: "Your information: ", user, followerCount, followingCount});
        } catch (error) {
            console.error(error);
        }
    },

    async getCurrentWithPostProjectFollowers(req, res) {
        try {
            const user = await User
                .findById(req.user._id)
                .populate("postId", "bodyText")
                .populate("projectId", "title")
                .populate("followers", "name")
                .populate("following", "name");
            res.send({message: "Your information: ", user});
        } catch (error) {
            console.error(error);
        }
    },

    async follow(req, res) {
        try {
            if (!req.params._id.match(/^[0-9a-fA-F]{24}$/)) {
                return res
                    .status(400)
                    .send({message: "Invalid ID"});
            }
            const userToFollow = await User.findById(req.params._id);
            if (!userToFollow) {
                return res
                    .status(400)
                    .send(`User does not exist in DB`);
            } else if (req.user.following.includes(userToFollow._id)) {
                return res
                    .status(400)
                    .send({message: `You already follow ${userToFollow.name}.`});
            } else {
                await User.findByIdAndUpdate(req.user._id, {
                    $push: {
                        following: userToFollow._id
                    }
                }, {new: true});
                await User.findByIdAndUpdate(userToFollow._id, {
                    $push: {
                        followers: req.user._id
                    }
                }, {new: true});
            }
            res
                .status(201)
                .send({message: `${req.user.name} is now following ${userToFollow.name}`});
        } catch (error) {
            console.error(error);
            res
                .status(500)
                .send(error);
        }
    },

    async unfollow(req, res) {
        try {
            if (!req.params._id.match(/^[0-9a-fA-F]{24}$/)) {
                return res
                    .status(400)
                    .send({message: "Invalid ID"});
            }
            const userToUnfollow = await User.findById(req.params._id);
            if (!userToUnfollow) {
                return res
                    .status(400)
                    .send(`User does not exist in DB`);
            } else if (!req.user.following.includes(userToUnfollow._id)) {
                return res
                    .status(400)
                    .send({message: `You are not following ${userToUnfollow.name}.`});
            } else {
                await User.findByIdAndUpdate(req.user._id, {
                    $pull: {
                        following: userToUnfollow._id
                    }
                }, {new: true});
                await User.findByIdAndUpdate(userToUnfollow._id, {
                    $pull: {
                        followers: req.user._id
                    }
                }, {new: true});
            }
            res
                .status(201)
                .send({message: `${req.user.name} has unfollowed ${userToUnfollow.name}`});
        } catch (error) {
            console.error(error);
            res
                .status(500)
                .send(error);
        }
    },

    async logout(req, res) {
        try {
            await User.findByIdAndUpdate(req.user._id, {
                $pull: {
                    tokens: req.headers.authorization
                }
            });
            res.send({message: "Logged out successfully."});
        } catch (error) {
            console.error(error);
            res
                .status(500)
                .send({message: "There was an error while logging out user."});
        }
    }
};

module.exports = UserController;
