const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please fill in your name"],
      },
    description: {
        type: String,
        required: [true, "Please fill in your description"],
      },
    team: {
        type: ObjectId,
        ref: 'Team'
      },
    favorites: [{
      type: ObjectId,
      ref: "User",
      default: 0,
      }],
}, { timestamps: true });

    ProjectSchema.index({

    title: "text",
    
    });

    ProjectSchema.index({
      title: "text",
    });

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;