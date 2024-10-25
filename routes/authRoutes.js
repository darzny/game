const express = require("express");
const { Op } = require("sequelize");

const bcrypt = require("bcrypt");
const router = express.Router();

const User = require("../models/User");

router.post("/register", async (req, res) => {
	const { username, email, password } = req.body;

	try {
		const existingUser = await User.findOne({
			where: {
				[Op.or]: [{ username }, { email }],
			},
		});

		if (existingUser) {
			return res
				.status(400)
				.json({ message: "Username or email already exists" });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = await User.create({
			username,
			email,
			password: hashedPassword,
		});

		req.session.userId = newUser.id;

		res
			.status(201)
			.json({ message: "Registration successful", userId: newUser.id });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "An error occurred" });
	}
});

router.post("/login", async (req, res) => {
	const { username, password } = req.body;

	try {
		const user = await User.findOne({ where: { username } });

		if (!user) {
			return res.status(400).json({ message: "User not found" });
		}

		const isValidPassword = await bcrypt.compare(password, user.password);

		if (!isValidPassword) {
			return res.status(400).json({ message: "Incorrect password" });
		}

		req.session.userId = user.id;
		res.status(200).json({ message: "Login successful", userId: user.id });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "An error occurred" });
	}
});

router.post("/logout", (req, res) => {
	req.session.destroy((err) => {
		if (err) {
			return res
				.status(500)
				.json({ message: "An error occurred during logout" });
		}
		res.clearCookie("connect.sid");
		res.redirect("/");
	});
});

module.exports = router;
