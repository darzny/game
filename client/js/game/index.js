import Game from "./game.js";

import { startGameSession, endGameSession } from "./../api/session.js";

const startGame = () => {
	const canvas = document.getElementById("canvas1");
	const ctx = canvas.getContext("2d");

	canvas.width = 900;
	canvas.height = 500;

	const game = new Game(canvas.width, canvas.height);
	let lastTime = 0;

	let isStarted = false;

	const animate = (timestamp) => {
		if (game.gameOver) {
			isStarted = false;
		}

		const deltatime = timestamp - lastTime;
		lastTime = timestamp;

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		if (isStarted) {
			game.update(deltatime);
		}

		game.draw(ctx);

		if (!game.gameOver) {
			requestAnimationFrame(animate);
		} else {
			endGameSession(game.score, game.duration);
		}
	};

	window.addEventListener("keydown", (e) => {
		e.preventDefault();

		if (e.code === "Enter" && (game.gameOver || !isStarted)) {
			isStarted = true;

			game.restartGame();
			startGameSession();
			requestAnimationFrame(animate);
		}
	});

	requestAnimationFrame(animate);
};

window.addEventListener("load", () => {
	startGame();
});
