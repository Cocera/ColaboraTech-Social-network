const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const TeamInvitationSchema = new mongoose.Schema({
    TeamId: {
        type: ObjectId,
        ref: "Team"
    },
    accepted: Boolean
}, {timestamps: true});

const Invitation = mongoose.model("Invitation", TeamInvitationSchema);

module.exports = Invitation;
