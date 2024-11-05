// api/auth.js

export const login = async (username, password) => {
	try {
		const response = await fetch("/api/auth/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username, password }),
		});
		return response;
	} catch (error) {
		console.error("Error:", error);
		throw new Error("An error occurred. Please try again.");
	}
};

export const register = async (username, email, password) => {
	try {
		const response = await fetch("/api/auth/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username, email, password }),
		});
		return response;
	} catch (error) {
		console.error("Error:", error);
		throw new Error("An error occurred. Please try again.");
	}
};

export const logout = async () => {
	try {
		const response = await fetch("/api/auth/logout", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		});
		return response;
	} catch (error) {
		console.error("Error:", error);
		throw new Error("An error occurred. Please try again.");
	}
};
