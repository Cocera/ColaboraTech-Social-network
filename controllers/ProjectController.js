const Project = require("../models/Project");

const ProjectController = {
    async create (req,res,next){
        try {
            const project = await Project.create(req.body)
            res.status(201).send({msg:"Project created succesfully",project})
        } catch (error) {
            console.error(error)
            res.status(500).send({msg:"There was a problem in creating"})
        }
    },
    async update(req,res,next) {
        try {
          const project = await Project.findByIdAndUpdate(
            req.params._id,
            req.body,
            { new: true }
          );
          res.send({ message: "project successfully updated", project });
        } catch (error) {
          console.error(error);
        }
    },
    async delete(req,res,next) {
        try {
          const project = await Project.findByIdAndDelete(req.params._id);
          res.send({ message: "Project deleted", project });
        } catch (error) {
          console.error(error);
          res
            .status(500)
            .send({ message: "There was a problem trying to remove the project" });
        }
    },
    async getAll(req,res) {
        try {
            const { page = 1, limit = 10 } = req.query;
            const projects = await Project.find()
              .limit(limit)
              .skip((page - 1) * limit);
            res.send (projects);
        } catch (error) {
          console.error(error);
        }
    },
    async getProjectByName(req,res) {
        try {
            const projects = await Project.find({
                $text: {
                $search: req.params.name,
                },
            });res.send (projects);
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
      const project = await Project.findByIdAndUpdate(
      req.params._id,
      { $push: { likes: req.user._id } },
      { new: true }
      );
      res.send(project);
      } catch (error) {
      console.error(error);
      res.status(500).send({ message: "There was a problem with your like" });
      }
    },
}
module.exports = ProjectController