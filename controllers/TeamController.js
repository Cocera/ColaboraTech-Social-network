const Team = require("../models/Team.js");

const TeamController = {
   
    async update(req,res,next) {
        try {
          const team = await Team.findByIdAndUpdate(
            req.params._id,
            req.body,
            { new: true }
          );
          res.send({message:"team successfully updated", team});
        } catch (error) {
          console.error(error);
          next(error);
        }
    },
    async delete(req,res,next) {
        try {
          const team = await Team.findByIdAndDelete(req.params._id);
          res.send({ message: "Team deleted", team });
        } catch (error) {
          console.error(error);
          next(error);
          res
            .status(500)
            .send({ message: "There was a problem trying to remove the team" });
        }
    },
    async getAll(req,res) {
        try {
            const { page = 1, limit = 10 } = req.query;
            const teams = await Team.find()
              .limit(limit)
              .skip((page - 1) * limit);
            res.send (teams);
        } catch (error) {
          console.error(error);
        }
    },
    async getTeamByName(req,res) {
        try {
            const teams = await Team.find({
                $text: {
                $search: req.params.title,
                },
            });
            if (teams.length == 0) {return res.send({msg:"Team not found"})}
            res.send(teams);
        } catch (error) {
            console.error(error);
        }
    },
    async getById(req, res) {
        try {
          const team = await Team.findById(req.params._id);
          res.send(team);
        } catch (error) {
          console.error(error);
        }
    },

}
module.exports = TeamController