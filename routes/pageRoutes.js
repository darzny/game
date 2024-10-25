const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const path = require("path");
const router = express.Router();

router.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "../public", "index.html"));
});

router.get("/game", authMiddleware, (req, res) => {
	res.sendFile(path.join(__dirname, "../public", "game.html"));
});

router.get("/leaderboard", authMiddleware, (req, res) => {
	res.sendFile(path.join(__dirname, "../public", "leaderboard.html"));
});

router.get("/results", authMiddleware, (req, res) => {
	res.sendFile(path.join(__dirname, "../public", "results.html"));
});

module.exports = router;
