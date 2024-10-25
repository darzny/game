import {
	Stay,
	Jump,
	Fall,
	Run,
	Sit,
	Roll,
	Dive,
	Hit,
	states,
	PLAYER_STATE,
} from "./playerStates.js";
import { GAME_KEY } from "./keys.js";

import { Collision } from "./collision.js";

export default class Player {
	constructor(game) {
		this.game = game;
		this.spriteWidth = 100;
		this.spriteHeight = 91.3;

		const sizeModifier = 1;

		this.width = this.spriteWidth / sizeModifier;
		this.height = this.spriteHeight / sizeModifier;

		this.x = 20;
		this.y = this.game.height - this.height - this.game.groundMargin;

		this.frameX = 0;
		this.frameY = 0;
		this.maxFrame = 5;

		this.speed = 0;
		this.maxSpeed = 0.2;

		this.fps = 20;
		this.frameInterval = 1000 / this.fps;
		this.frameTimer = 0;

		this.vy = 0;
		this.maxVy = 25;
		this.weight = 1;

		this.image = document.getElementById("playerImage");

		this.states = [
			new Stay(this.game),
			new Jump(this.game),
			new Fall(this.game),
			new Run(this.game),
			new Sit(this.game),
			new Roll(this.game),
			new Dive(this.game),
			new Hit(this.game),
		];
	}

	update(input, deltaTime) {
		this.checkColission();
		this.currentState.handleInput(input);

		this.x += this.speed;

		if (
			input.includes(GAME_KEY.RIGHT) &&
			this.currentState !== this.states[6]
		) {
			this.speed = this.maxSpeed;
		} else {
			this.speed = 0;
		}

		if (this.x < 0) {
			this.x = 0;
		}

		if (this.x > this.game.width - this.width) {
			this.x = this.game.width - this.width;
		}

		this.y += this.vy;

		if (!this.isOnTheGround()) {
			this.vy += this.weight;
		} else {
			this.vy = 0;
		}

		if (this.y > this.game.height - this.height - this.game.groundMargin) {
			this.y = this.game.height - this.height - this.game.groundMargin;
			this.vy = 0;
		}

		if (this.frameTimer > this.frameInterval) {
			this.frameTimer = 0;
			if (this.frameX < this.maxFrame) {
				this.frameX++;
			} else {
				this.frameX = 0;
			}
		} else {
			this.frameTimer += deltaTime;
		}
	}

	draw(context) {
		if (this.game.debug) {
			context.strokeRect(this.x, this.y, this.width, this.height);
		}
		context.drawImage(
			this.image,
			this.frameX * this.spriteWidth,
			this.frameY * this.spriteHeight,
			this.spriteWidth,
			this.spriteHeight,
			this.x,
			this.y,
			this.width,
			this.height
		);
	}

	isOnTheGround() {
		return (
			this.y >= this.game.height - this.height - this.game.groundMargin - 1
		);
	}

	setState(state, speed) {
		this.currentState = this.states[state];
		this.game.speed = this.game.maxSpeed * speed;
		this.currentState.enter(state);
	}

	checkColission() {
		this.game.enemies.forEach((enemy) => {
			if (
				enemy.x < this.x + this.width &&
				enemy.x + enemy.width > this.x &&
				enemy.y < this.y + this.height &&
				enemy.y + enemy.height > this.y
			) {
				enemy.markedForDeletion = true;
				this.game.collisions.push(
					new Collision(
						this.game,
						enemy.x + enemy.width * 0.5,
						enemy.y + enemy.height * 0.5
					)
				);

				if (
					this.currentState === this.states[5] ||
					this.currentState === this.states[6]
				) {
					this.game.score++;
					return;
				}

				this.setState(states[PLAYER_STATE.HIT], 0);
				this.game.lives--;

				if (this.game.lives <= 0) {
					this.game.gameOver = true;
				}
			}
		});
	}

	reset() {
		this.x = 20;
		this.y = this.game.height - this.height - this.game.groundMargin;
		this.frameTimer = 0;
		this.vy = 0;
	}
}
