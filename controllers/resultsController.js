const { Op } = require("sequelize");
const Session = require("../models/Session");

exports.getUserResults = async (req, res) => {
	const userId = req.session.userId;

	if (!userId) {
		return res.status(401).json({ message: "User not logged in." });
	}

	try {
		const results = await Session.findAll({
			where: { userId, endTime: { [Op.not]: null } },
			order: [["score", "DESC"]],
			limit: 10,
		});

		res.status(200).json(results);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: "An error occurred while retrieving your results.",
		});
	}
};
