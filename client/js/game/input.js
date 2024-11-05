import { AVAILABLE_KEYS, GAME_KEYS, GAME_KEY } from "./keys.js";

export default class InputHandler {
	constructor(game) {
		this.keys = [];
		this.game = game;

		window.addEventListener("keydown", (event) => {
			const keysToCheck = this.game.gameOver ? AVAILABLE_KEYS : GAME_KEYS;

			if (
				!keysToCheck.includes(event.key) ||
				this.keys.indexOf(event.key) !== -1
			) {
				return;
			}

			if (event.key === GAME_KEY.D) {
				this.game.debug = !this.game.debug;
				return;
			}

			this.keys.push(event.key);
		});

		window.addEventListener("keyup", (event) => {
			if (
				!AVAILABLE_KEYS.includes(event.key) ||
				this.keys.indexOf(event.key) === -1
			) {
				return;
			}

			this.keys = this.keys.filter((k) => k !== event.key);
		});
	}
}
