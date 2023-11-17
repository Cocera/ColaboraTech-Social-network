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

            const url = `http://localhost:8080/invitations/response/${emailToken}`;

            await transporter.sendMail({to: user.email, subject: "ColaboraTech: You've been invited to collaborate on a project.", html: `<body style="background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
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
                        <p style="font-family: sans-serif; font-size: 16px; font-weight: normal; margin: 0; margin-bottom: 15px;">Thank you for being part of the ColaboraTech community.  Your skills are impressive and have caught your peers' attention.  Let's put them to the test!
                        </p>
                        <p style="font-family: sans-serif; font-size: 16px; font-weight: normal; margin: 0; margin-bottom: 15px;">The organizers of <b>${project.title} Team</b> would like you to collaborate and join their project.</p>
                        <p style="font-family: sans-serif; font-size: 16px; font-weight: normal; margin: 0; margin-bottom: 20px;">Respond to their invitation below:</p>
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; box-sizing: border-box; width: 100%;" width="100%">
                          <tbody>
                            <tr>
                              <td align="center" style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;" valign="top">
                                <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: auto;">
                                  <tbody>
                                    <tr>
                                      <td style="font-family: sans-serif; font-size: 14px; vertical-align: top; border-radius: 5px; text-align: center; background-color: #427D9D; margin-bottom: 10px" valign="top" align="center" bgcolor="#427D9D"> <a href="${url}?action=accept" target="_blank" style="border: solid 1px #427D9D; border-radius: 5px; box-sizing: border-box; cursor: pointer; display: inline-block; font-size: 14px; font-weight: bold; margin: 0; padding: 12px 25px; text-decoration: none; text-transform: capitalize; background-color: #427D9D; border-color: #427D9D; color: #ffffff;">Accept</a> </td>
                                      </tr>
                                      <br>
                                      <tr>
                                      <td style="font-family: sans-serif; font-size: 14px; vertical-align: top; border-radius: 5px; text-align: center; background-color: #9BBEC8;" valign="top" align="center" bgcolor="#9BBEC8"> <a href="${url}?action=decline" target="_blank" style="border: solid 1px #9BBEC8; border-radius: 5px; box-sizing: border-box; cursor: pointer; display: inline-block; font-size: 14px; font-weight: bold; margin: 0; padding: 12px 25px; text-decoration: none; text-transform: capitalize; background-color: #9BBEC8; border-color: #9BBEC8; color: #ffffff;">Decline</a> </td>
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
  </body>`});

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
