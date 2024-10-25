document.getElementById("showRegisterForm")?.addEventListener("click", (e) => {
	e.preventDefault();
	document.getElementById("loginForm").style.display = "none";
	document.getElementById("registerForm").style.display = "block";
});

document.getElementById("showLoginForm")?.addEventListener("click", (e) => {
	e.preventDefault();
	document.getElementById("registerForm").style.display = "none";
	document.getElementById("loginForm").style.display = "block";
});

document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
	e.preventDefault();

	const username = document.getElementById("username").value;
	const password = document.getElementById("password").value;

	try {
		const response = await fetch("/api/auth/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username, password }),
		});

		const result = await response.json();
		if (response.ok) {
			window.location.href = "/game";
		} else {
			alert(result.message || "Login failed");
		}
	} catch (error) {
		console.error("Error:", error);
		alert("An error occurred. Please try again.");
	}
});

document
	.getElementById("registerForm")
	?.addEventListener("submit", async (e) => {
		e.preventDefault();

		const username = document.getElementById("regUsername").value;
		const email = document.getElementById("regEmail").value;
		const password = document.getElementById("regPassword").value;

		try {
			const response = await fetch("/api/auth/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ username, email, password }),
			});

			const result = await response.json();

			if (response.ok) {
				window.location.href = "/game";
				return;
			}

			alert(result.message || "Registration failed");
		} catch (error) {
			console.error("Error:", error);
			alert("An error occurred. Please try again.");
		}
	});
