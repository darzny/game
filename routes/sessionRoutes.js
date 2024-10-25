const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const Session = require("../models/Session");

const MAX_SCORE_PER_MINUTE = 100;
const MIN_WINNING_SCORE = 40;
const TIME_DEVIATION = 100;
const WINNING_DURATION = 100000;

router.post("/start", async (req, res) => {
	const userId = req.session.userId;

	if (!userId) {
		return res.status(401).json({ message: "User not logged in." });
	}

	try {
		const session = await Session.create({ userId });

		req.session.gameSessionId = session.id;

		res
			.status(201)
			.json({ message: "Game session started.", sessionId: session.id });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "An error occurred." });
	}
});

router.patch("/end", async (req, res) => {
	const { score, duration } = req.body;
	const sessionId = req.session.gameSessionId;

	if (!sessionId) {
		return res.status(400).json({ message: "Game session not found." });
	}

	try {
		const session = await Session.findByPk(sessionId);

		if (!session) {
			return res.status(400).json({ message: "Invalid game session." });
		}

		const createdAt = new Date(session.createdAt);
		const currentTime = new Date();

		const actualDuration = Math.round(currentTime - createdAt);

		if (Math.abs(actualDuration - duration) > TIME_DEVIATION) {
			return res.status(400).json({ message: "Invalid game duration." });
		}

		const maxAllowedScore = (duration / 60) * MAX_SCORE_PER_MINUTE;
		if (score > maxAllowedScore) {
			return res.status(400).json({ message: "Score exceeds allowed limit." });
		}

		await session.update({
			score,
			isWin:
				score >= MIN_WINNING_SCORE &&
				actualDuration >= WINNING_DURATION - TIME_DEVIATION,
			endTime: currentTime,
		});

		delete req.session.gameSessionId;

		res.status(200).json({ message: "Game session ended." });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "An error occurred." });
	}
});

module.exports = router;
