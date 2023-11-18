const Project = require("../models/Project");
const Team = require("../models/Team");
const User = require("../models/User");

const ProjectController = {
	async create(req, res, next) {
		try {
			const project = await Project.create(req.body);
			const team = await Team.create({
				...req.body,
				projectId: project._id,
				teamName: `${project.title} Team`,
				projectAdmin: req.user._id,
				members: [req.user._id],
			});
			await team.save();
			const updatedProject = await Project.findByIdAndUpdate(
				project._id,
				{
					$set: {
						team: team._id,
					},
				},
				{ new: true }
			);
			await User.findByIdAndUpdate(
				req.user._id,
				{
					$push: {
						projectId: updatedProject._id,
					},
				},
				{ new: true }
			);
			res
				.status(201)
				.send({ msg: "Project created successfully.", updatedProject });
		} catch (error) {
			console.error(error);
			next(error);
		}
	},

	async update(req, res, next) {
		try {
			const project = await Project.findByIdAndUpdate(
				req.params._id,
				req.body,
				{ new: true }
			);
			res.send({ message: "Project successfully updated.", project });
		} catch (error) {
			console.error(error);
			next(error);
		}
	},

	async delete(req, res, next) {
		try {
			const project = await Project.findById(req.params._id);
			if (!project) {
				return res.status(404).send({ message: "Project not found." });
			}
			await Project.deleteOne({ _id: req.params._id });
			await Team.deleteOne({ projectId: req.params._id });
			await User.findByIdAndUpdate(
				req.user._id,
				{
					$pull: {
						projectId: req.params._id,
					},
				},
				{ new: true }
			);
			res.send({ message: "Project deleted", project });
		} catch (error) {
			console.error(error);
			next(error);
			res
				.status(500)
				.send({ message: "There was a problem deleting the project.", error });
		}
	},

	async getAll(req, res) {
		try {
			const { page = 1, limit = 10 } = req.query;
			const projects = await Project.find()
				.limit(limit)
				.skip((page - 1) * limit)
				.populate({
					path: "team",
					populate: {
						path: "members",
						select: "name",
					},
				})
				.populate({ path: "favorites", select: "name" })
				.exec();
			res.send(projects);
		} catch (error) {
			console.error(error);
			res
				.status(500)
				.send({ message: "There was a problem getting all projects.", error });
		}
	},

	async getProjectByName(req, res) {
		try {
			const projects = await Project.find({
				$text: {
					$search: req.params.title,
				},
			})
				.populate({
					path: "team",
					populate: {
						path: "members",
						select: "name",
					},
				})
				.populate({ path: "favorites", select: "name" })
				.exec();
			res.send(projects);
		} catch (error) {
			console.error(error);
			res
				.status(500)
				.send({
					message: "There was a problem getting projects by title.",
					error,
				});
		}
	},

	async getById(req, res) {
		try {
			if (!req.params._id.match(/^[0-9a-fA-F]{24}$/)) {
				return res.status(400).send({ message: "Invalid ID." });
			}
			const project = await Project.findById(req.params._id)
				.populate({
					path: "team",
					populate: {
						path: "members",
						select: "name",
					},
				})
				.populate({ path: "favorites", select: "name" })
				.exec();
			if (!project) {
				return res
					.status(400)
					.send(`Id ${req.params._id} does not exists in DB.`);
			}
			res.send(project);
		} catch (error) {
			console.error(error);
			res
				.status(500)
				.send({ message: "There was a problem deleting the project.", error });
		}
	},

	async addFavorite(req, res) {
		try {
			if (!req.params._id.match(/^[0-9a-fA-F]{24}$/)) {
				return res.status(400).send({ message: "Invalid ID." });
			}
			const project = await Project.findById(req.params._id);
			if (!project) {
				return res.status(400).send(`Project does not exist in DB.`);
			} else if (project.favorites.includes(req.user._id)) {
				return res
					.status(400)
					.send({
						message: `${req.user.name} already added this project to favorites.`,
					});
			} else {
				await Project.findByIdAndUpdate(
					req.params._id,
					{
						$push: {
							favorites: req.user._id,
						},
					},
					{ new: true }
				);
				await User.findByIdAndUpdate(
					req.user._id,
					{
						$push: {
							favProjects: req.params._id,
						},
					},
					{ new: true }
				);
			}
			res.send({
				message: `${req.user.name} added project with id: ${req.params._id} to favorites.`,
			});
		} catch (error) {
			console.error(error);
			res
				.status(500)
				.send({ message: "Error adding project to favorites.", error });
		}
	},

	async removeFavorite(req, res) {
		try {
			if (!req.params._id.match(/^[0-9a-fA-F]{24}$/)) {
				return res.status(400).send({ message: "Invalid ID." });
			}
			const project = await Project.findById(req.params._id);
			if (!project) {
				return res.status(400).send(`Project does not exist in DB.`);
			} else if (!project.favorites.includes(req.user._id)) {
				return res
					.status(400)
					.send({
						message: `${project.title} doesn't exist in your favorites.`,
					});
			} else {
				await Project.findByIdAndUpdate(
					req.params._id,
					{
						$pull: {
							favorites: req.user._id,
						},
					},
					{ new: true }
				);
				await User.findByIdAndUpdate(
					req.user._id,
					{
						$pull: {
							favProjects: req.params._id,
						},
					},
					{ new: true }
				);
			}
			res.send({
				message: `${req.user.name} removed project with id: ${req.params._id} from favorites.`,
			});
		} catch (error) {
			console.error(error);
			res
				.status(500)
				.send({ message: "Error removing project from favorites.", error });
		}
	},
};
module.exports = ProjectController;
