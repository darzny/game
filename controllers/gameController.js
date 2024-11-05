const Session = require("../models/Session");

exports.saveScore = async (req, res) => {
	const { userId, score } = req.body;
	try {
		const newSession = await Session.create({ userId, score });
		res.status(201).json(newSession);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.saveSession = async (req, res) => {
	const { userId, duration, score } = req.body;
	try {
		const newSession = await Session.create({ userId, duration, score });
		res.status(201).json(newSession);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
