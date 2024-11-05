const express = require("express");
const router = express.Router();
const sessionController = require("../controllers/sessionController");

router.post("/start", sessionController.startSession);
router.patch("/end", sessionController.endSession);

module.exports = router;
