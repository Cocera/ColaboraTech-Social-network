const Project = require("../models/Project.js");
const Team = require("../models/Team.js");

const TeamController = {
  async addMembers(req, res, next) {
    try {

      if (!req.params._id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).send({message: "Invalid ID"});
      } else if (!Array.isArray(req.body.members)) {
        return res.status(400).send({message: "Members should be an array of user IDs"});
      };

      const members = req.body.members;
      const project = await Project.findById(req.params._id);
      const projectTeam = await Team.findById(project.team);

      if (!project) {
        return res.status(400).send(`Project id: ${req.params._id} does not exist in DB`);
      } else {
        const existingMembers = projectTeam.members.filter(member => members.includes(member.toString()));
      
        if (existingMembers.length > 0) {
          return res.status(400).send({ message: "One or more members are already in the team" });
        } else {
          await Team.findByIdAndUpdate(project.team, {
            $push: {
              members: {
                $each: members
              }
            }
          }, { new: true });
        }
      }

      res.send({message: `Members with id ${members} added successfully to project ${project.title}`});

    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  async removeMembers(req, res, next) {
    try {

      if (!req.params._id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).send({message: "Invalid ID"});
      } else if (!Array.isArray(req.body.members)) {
        return res.status(400).send({message: "Members should be an array of user IDs"});
      };

      const membersToDelete = req.body.members;
      const project = await Project.findById(req.params._id);
      const projectTeam = await Team.findById(project.team);

      if (!project) {
        return res.status(400).send(`Project id: ${req.params._id} does not exist in DB`);
      } else {
        const existingMembers = projectTeam.members.filter(member => membersToDelete.includes(member.toString()));
      
        if (existingMembers.length == 0) {
          return res.status(400).send({ message: `CAN NOT DELETE: Users with id ${membersToDelete} are not in this team` });
        } else {
          await Team.findByIdAndUpdate(project.team, {
            $pull: {
              members: {
                $in: membersToDelete
              }
            }
          }, {new: true});
        }
      };

      res.send({message: "Members removed successfully"});

    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  async getAll(req, res) {
    try {
      const {
        page = 1,
        limit = 10
      } = req.query;
      const teams = await Team
        .find()
        .limit(limit)
        .skip((page - 1) * limit);
      res.send(teams);
    } catch (error) {
      console.error(error);
    }
  }
};
module.exports = TeamController;
