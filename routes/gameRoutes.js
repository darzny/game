const express = require("express");
const router = express.Router();
const gameController = require("../controllers/gameController");

router.post("/score", gameController.saveScore);
router.get("/top-scores", gameController.getTopScores);
router.post("/session", gameController.saveSession);

module.exports = router;
