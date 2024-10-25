export const startGameSession = () => {
	fetch("/api/session/start", { method: "POST" })
		.then((response) => response.json())
		.then((data) => {
			console.log("Game session started:", data.sessionId);
		})
		.catch((err) => console.error("Failed to start game session:", err));
};

export const endGameSession = (score, duration) => {
	fetch("/api/session/end", {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ score, duration }),
	})
		.then((response) => response.json())
		.then((data) => {
			console.log(data.message);
		})
		.catch((err) => console.error("Failed to end game session:", err));
};
