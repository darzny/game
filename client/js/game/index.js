import Game from "./game.js";

import { startGameSession, endGameSession } from "./../api/session.js";

(function () {
	"use strict";

	const startGame = () => {
		const canvas = document.getElementById("canvas1");
		const ctx = canvas.getContext("2d");

		canvas.width = 900;
		canvas.height = 500;

		const game = new Game(canvas.width, canvas.height);
		let lastTime = 0;

		const animate = (timestamp) => {
			const deltatime = timestamp - lastTime;
			lastTime = timestamp;

			ctx.clearRect(0, 0, canvas.width, canvas.height);

			if (game.isStarted) {
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

			if (e.code === "Enter" && (game.gameOver || !game.isStarted)) {
				if (!game.isStarted) {
					game.isStarted = true;

					game.restartGame();

					startGameSession();

					return;
				}

				game.restartGame();

				startGameSession();

				animate(0);
			}
		});

		animate(0);
	};

	window.addEventListener("load", () => {
		startGame();
	});
})();
