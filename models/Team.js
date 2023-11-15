const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const TeamSchema = new mongoose.Schema({
  ProjectId: {
    type: ObjectId,
    ref: "Project"
  },
  TeamName: String,
  ProjectAdmin: {
    type: ObjectId,
    ref: "User"
  },
  members: [
    {
      type: ObjectId,
      ref: "User"
    }
  ]
}, {timestamps: true});

const Team = mongoose.model("Team", TeamSchema);

module.exports = Team;
