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
            const invitation = await Invitation.create({userId: user._id, teamId: project.team, status: "pending"});
            const emailToken = jwt.sign({
                email: user.email,
                invitationId: invitation._id
            }, jwt_secret, {expiresIn: "48h"});

            const url = `http://localhost:8080/invitations/acceptInvitation/${emailToken}?action=accept`;
            const url1 = `http://localhost:8080/invitations/declineInvitation/${emailToken}?action=decline`;

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
            const {action} = req.query;
            const payload = jwt.verify(token, jwt_secret);
            const invitation = await Invitation.findById(payload.invitationId);
            const user = await User.findOne({email: payload.email});
            const project = await Project.findOne({team: invitation.teamId});
            const team = await Team.findById(project.team);

            if (!team) {
                return res
                    .status(400)
                    .send(`Team does not exist in DB`);
            } else if (!user) {
                return res
                    .status(400)
                    .send(`User does not exist in DB`);
            } else if (team.members.includes(user._id)) {
                return res
                    .status(400)
                    .send({message: `${user.name} is already a team member.`});
            } else {
                await Invitation.findOneAndUpdate({
                    userId: user._id,
                    status: "pending"
                }, {
                    status: action === "accept"
                        ? "accepted"
                        : "declined"
                }, {new: true});

                if (action === "accept") {
                    await Team.findByIdAndUpdate(project.team, {
                        $push: {
                            members: invitation.userId
                        }
                    }, {new: true});
                    await Invitation.deleteOne({_id: invitation._id});
                    res
                        .status(201)
                        .send("Invitation accepted successfully.");
                } else if (action === "decline") {
                    await Invitation.deleteOne({_id: invitation._id});
                    res
                        .status(201)
                        .send("Invitation declined successfully.");
                } else {
                    res
                        .status(400)
                        .send("Invalid action parameter.");
                }
            }
        } catch (error) {
            console.error(error);
        }
    }
};

module.exports = TeamInvitationController;
