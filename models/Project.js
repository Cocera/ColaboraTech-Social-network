const mongoose = require("mongoose");
const ObjectId = mongoose.SchemaTypes.ObjectId;

const ProjectSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, "Please add a project title."],
		},
		description: {
			type: String,
			required: [true, "Please add a project description."],
		},
		team: {
			type: ObjectId,
			ref: "Team",
		},
		favorites: [
			{
				type: ObjectId,
				ref: "User",
				default: 0,
			},
		],
	},
	{ timestamps: true }
);

ProjectSchema.index({ title: "text" });

const Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;
