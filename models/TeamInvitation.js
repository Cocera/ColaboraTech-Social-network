const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const TeamInvitationSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        ref: "User"
    },
    teamId: {
        type: ObjectId,
        ref: "Team"
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "declined"]
    }
}, {timestamps: true});

const Invitation = mongoose.model("Invitation", TeamInvitationSchema);

module.exports = Invitation;
