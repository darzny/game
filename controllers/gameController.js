const pool = require("../config/db");

exports.saveScore = async (req, res) => {
	const { user_id, score } = req.body;
	try {
		const result = await pool.query(
			"INSERT INTO scores (user_id, score) VALUES ($1, $2) RETURNING *",
			[user_id, score]
		);
		res.status(201).json(result.rows[0]);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.getTopScores = async (req, res) => {
	try {
		const result = await pool.query(
			"SELECT * FROM scores ORDER BY score DESC LIMIT 10"
		);
		res.status(200).json(result.rows);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.saveSession = async (req, res) => {
	const { user_id, duration, score } = req.body;
	try {
		const result = await pool.query(
			"INSERT INTO sessions (user_id, duration, score) VALUES ($1, $2, $3) RETURNING *",
			[user_id, duration, score]
		);
		res.status(201).json(result.rows[0]);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
