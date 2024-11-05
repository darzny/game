const { Op } = require("sequelize");
const Session = require("../models/Session");
const User = require("../models/User");

exports.getTopScores = async (req, res) => {
	try {
		const results = await Session.findAll({
			include: [{ model: User, attributes: ["username"], as: "User" }],
			where: { score: { [Op.not]: null } },
			order: [["score", "DESC"]],
			limit: 10,
		});

		res.status(200).json(
			results.map((result) => ({
				score: result.score,
				username: result.User.username,
				createdAt: result.createdAt,
			}))
		);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: "An error occurred while retrieving leaderboard data.",
		});
	}
};
