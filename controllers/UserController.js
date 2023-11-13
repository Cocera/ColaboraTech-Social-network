const User = require("../models/User");
const bcrypt = require("bcryptjs");

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
    }
};

module.exports = UserController;
