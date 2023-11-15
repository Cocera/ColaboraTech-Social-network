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
            // .populate("followers");
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
