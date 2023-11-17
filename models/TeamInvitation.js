const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const TeamInvitationSchema = new mongoose.Schema({
    UserId: {
        type: ObjectId,
        ref: "User"
    },
    TeamId: {
        type: ObjectId,
        ref: "Team"
    },
    accepted: Boolean
}, {timestamps: true});

const Invitation = mongoose.model("Invitation", TeamInvitationSchema);

module.exports = Invitation;
