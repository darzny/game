const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const path = require("path");

const gameRoutes = require("./routes/gameRoutes");
const pageRoutes = require("./routes/pageRoutes");
const authRoutes = require("./routes/authRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const leaderboardRoutes = require("./routes/leaderboardRoutes");
const resultsRoutes = require("./routes/resultsRoutes");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: true,
		cookie: { secure: false },
	})
);

app.use("/api/game", gameRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/session", sessionRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/results", resultsRoutes);

app.use("/", pageRoutes);

app.listen(PORT, () => {
	console.log(`Server running on port http://localhost:${PORT}`);
});
