const Invitation = require("../models/TeamInvitation.js");
const User = require("../models/User.js");
const Project = require("../models/Project.js");
const Team = require("../models/Team.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwt_secret = process.env.JWT_SECRET;
const transporter = require("../config/nodemailer.js");

const TeamInvitationController = {
    async sendInvitation(req, res) {
        try {
            const user = await User.findById(req.params.userId);
            const project = await Project.findById(req.params._id);
            const invitation = await Invitation.create({UserId: user._id, TeamId: project.team, accepted: false});
            const emailToken = jwt.sign({
                email: user.email
            }, jwt_secret, {expiresIn: "48h"});
            const url = "http://localhost:8080/invitations/acceptInvitation/" + emailToken;
            const url1 = "http://localhost:8080/invitations/declineInvitation/" + emailToken;
            await transporter.sendMail({to: user.email, subject: "ColaboraTech: You've been invited to collaborate on a team.", html: `<h3> Welcome, you're just a step away from joining our team!  </h3>
                <a href="${url}"> Accept invitation :D </a> <br> <a href="${url1}"> Decline invitation :'( </a>
                `});
            res
                .status(201)
                .send({message: `We've sent an email invitation to join your project.`, invitation});
        } catch (error) {
            console.error(error);
        }
    },

    async response(req, res) {
        try {
            const token = req.params.emailToken;
            const payload = jwt.verify(token, jwt_secret);
            const user = await User.findOne({email: payload.email});
            const project = await Project.findById(req.params._id);
            const team = await Team.findById(project.team);
            console.log(team);
            if (!team) {
                return res
                    .status(400)
                    .send(`Team does not exists in DB`);
            } else if (!user) {
                return res
                    .status(400)
                    .send(`User does not exists in DB`);
            } else if (team.members.includes(user._id)) {
                return res
                    .status(400)
                    .send({message: `${user.name} is already a team member.`});
            } else {
                await Invitation.findOneAndUpdate({
                    userId: user._id
                }, {
                    accepted: true
                }, {new: true});
            }
            res
                .status(201)
                .send("Invitation accepted successfully.");
        } catch (error) {
            console.error(error);
        }
    }
};
module.exports = TeamInvitationController;
