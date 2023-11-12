const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: String,
    description: String,
}, { timestamps: true });


const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;