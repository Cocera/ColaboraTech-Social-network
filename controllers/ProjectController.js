const Project = require("../models/Project");
const Team = require("../models/Team");
const User = require("../models/User");

const ProjectController = {
  async create(req, res, next) {
    try {
      const project = await Project.create(req.body);
      const team = await Team.create({
        ...req.body,
        ProjectId: project._id,
        TeamName: `${project.title} Team`,
        ProjectAdmin: req.user._id,
        members: [req.user._id]
      });
      await team.save();
      const updatedProject = await Project.findByIdAndUpdate(project._id, {
        $set: {
          team: team._id
        }
      }, {new: true});
      await User.findByIdAndUpdate(req.user._id, {
        $push: {
          projectId: updatedProject._id
        }
      }, {new: true});
      res
        .status(201)
        .send({msg: "Project created successfully", updatedProject});
    } catch (error) {
      console.error(error);
      next(error);
      res
        .status(500)
        .send({msg: "There was a problem in creating"});
    }
  },

  async update(req, res, next) {
    try {
      const project = await Project.findByIdAndUpdate(req.params._id, req.body, {new: true});
      res.send({message: "project successfully updated", project});
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      const project = await Project.findByIdAndDelete(req.params._id);
      res.send({message: "Project deleted", project});
    } catch (error) {
      console.error(error);
      next(error);
      res
        .status(500)
        .send({message: "There was a problem trying to remove the project"});
    }
  },

  async getAll(req, res) {
    try {
      const {
        page = 1,
        limit = 10
      } = req.query;
      const projects = await Project
        .find()
        .limit(limit)
        .skip((page - 1) * limit);
      res.send(projects);
    } catch (error) {
      console.error(error);
    }
  },

  async getProjectByName(req, res) {
    try {
      const projects = await Project.find({
        $text: {
          $search: req.params.name
        }
      });
      res.send(projects);
    } catch (error) {
      console.error(error);
    }
  },

  async getById(req, res) {
    try {
      const project = await Project.findById(req.params._id);
      res.send(project);
    } catch (error) {
      console.error(error);
    }
  },

  async like(req, res) {
    try {
      const project = await Project.findByIdAndUpdate(req.params._id, {
        $push: {
          likes: req.user._id
        }
      }, {new: true});
      res.send(project);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({message: "There was a problem with your like"});
    }
  },

  async unlike(req, res) {
    try {
      const project = await Project.findById(req.params.user_id);
      if (!project) {
        return res
          .status(404)
          .send({message: "Project not found"});
      }
      if (project.likes > 0) {
        project.likes -= 1;
      } else {
        return res
          .status(400)
          .send({message: "Project has no likes to remove"});
      }
      await project.save();
      res.send({message: "Project unliked", project});
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({message: "There was a problem unliking the project"});
    }
  }
};
module.exports = ProjectController;
