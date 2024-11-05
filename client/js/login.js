import { login, register } from "./api/auth.js";

(function () {
	"use strict";

	const showRegisterForm = (e) => {
		e.preventDefault();
		document.getElementById("loginForm").style.display = "none";
		document.getElementById("registerForm").style.display = "block";
	};

	const showLoginForm = (e) => {
		e.preventDefault();
		document.getElementById("registerForm").style.display = "none";
		document.getElementById("loginForm").style.display = "block";
	};

	const handleLoginSubmit = async (e) => {
		e.preventDefault();

		const username = document.getElementById("username").value;
		const password = document.getElementById("password").value;

		try {
			const response = await login(username, password);
			const result = await response.json();
			if (response.ok) {
				window.location.href = "/game";
			} else {
				alert(result.message || "Login failed");
			}
		} catch (error) {
			alert(error.message);
		}
	};

	const handleRegisterSubmit = async (e) => {
		e.preventDefault();

		const username = document.getElementById("regUsername").value;
		const email = document.getElementById("regEmail").value;
		const password = document.getElementById("regPassword").value;

		try {
			const response = await register(username, email, password);
			const result = await response.json();

			if (response.ok) {
				window.location.href = "/game";
				return;
			}

			alert(result.message || "Registration failed");
		} catch (error) {
			alert(error.message);
		}
	};

	document
		.getElementById("showRegisterForm")
		?.addEventListener("click", showRegisterForm);

	document
		.getElementById("showLoginForm")
		?.addEventListener("click", showLoginForm);

	document
		.getElementById("loginForm")
		?.addEventListener("submit", handleLoginSubmit);

	document
		.getElementById("registerForm")
		?.addEventListener("submit", handleRegisterSubmit);
})();
