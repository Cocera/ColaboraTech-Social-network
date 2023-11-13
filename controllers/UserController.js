const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {jwt_secret} = require("../config/keys.js");

const UserController = {
    async register(req, res, next) {
        try {
            const password = bcrypt.hashSync(req.body.password, 10);
            const user = await User.create({
                ...req.body,
                password: password
            });
            res
                .status(201)
                .send({message: "User registered successfully", user});
        } catch (error) {
            console.error(error);
            next(error);
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
    }
};

module.exports = UserController;
