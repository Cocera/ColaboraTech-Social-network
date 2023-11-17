const Project = require("../models/Project.js");
const Team = require("../models/Team.js");

const TeamController = {
  async addMembers(req, res, next) {
    try {
      const members = req.body.members;

      if (!Array.isArray(members)) {
        return res
          .status(400)
          .send({message: "Members should be an array of user IDs"});
      }

      const project = await Project.findById(req.params._id);
      const team = await Team.findByIdAndUpdate(project.team, {
        $push: {
          members: {
            $each: members
          }
        }
      }, {new: true});

      if (!team) {
        return res
          .status(404)
          .send({message: "Team not found"});
      }

      res.send({message: "Members added successfully", team});
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  async removeMembers(req, res, next) {
    try {
      const members = req.body.members;

      if (!Array.isArray(members)) {
        return res
          .status(400)
          .send({message: "Members should be an array of user IDs"});
      }

      const project = await Project.findById(req.params._id);
      const team = await Team.findByIdAndUpdate(project.team, {
        $pull: {
          members: {
            $in: members
          }
        }
      }, {new: true});

      if (!team) {
        return res
          .status(404)
          .send({message: "Team not found"});
      }

      res.send({message: "Members removed successfully", team});
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
