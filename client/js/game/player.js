import {
	Stay,
	Jump,
	Fall,
	Run,
	Sit,
	Roll,
	Hit,
	states,
	PLAYER_STATE,
} from "./playerStates.js";
import { GAME_KEY } from "./keys.js";

import { Collision } from "./collision.js";

export default class Player {
	constructor(game) {
		this.game = game;
		this.spriteWidth = 320.5;
		this.spriteHeight = 271;

		const sizeModifier = 0.5;

		this.width = this.spriteWidth * sizeModifier;
		this.height = this.spriteHeight * sizeModifier;

		this.x = 20;
		this.y = this.game.height - this.height - this.game.groundMargin;

		this.frameX = 0;
		this.frameYCoordinate = 0;
		this.maxFrame = 5;

		this.speed = 0;
		this.maxSpeed = 0.1;

		this.fps = 20;
		this.frameInterval = 1000 / this.fps;
		this.frameTimer = 0;

		this.vy = 0;
		this.maxVy = 26;
		this.weight = 1;

		this.image = document.getElementById("playerImage");

		this.states = [
			new Stay(this.game),
			new Jump(this.game),
			new Fall(this.game),
			new Run(this.game),
			new Sit(this.game),
			new Roll(this.game),
			new Hit(this.game),
		];
	}

	update(input, deltaTime) {
		this.checkColission();
		this.currentState.handleInput(input);

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
			const { x, y, width, height } = this.getCollisionBox();
			context.strokeRect(x, y, width, height);
		}

		context.drawImage(
			this.image,
			this.frameX * this.spriteWidth,
			this.frameYCoordinate,
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

	isSitting() {
		return this.currentState === this.states[4];
	}

	setState(state, speed) {
		this.currentState = this.states[state];
		this.game.speed = this.game.maxSpeed * speed;
		this.currentState.enter();
	}

	checkColission() {
		const playerBox = this.getCollisionBox();

		this.game.enemies.forEach((enemy) => {
			const enemyBox = {
				x: enemy.x,
				y: enemy.y,
				width: enemy.width,
				height: enemy.height,
			};

			if (
				playerBox.x < enemyBox.x + enemyBox.width &&
				playerBox.x + playerBox.width > enemyBox.x &&
				playerBox.y < enemyBox.y + enemyBox.height &&
				playerBox.y + playerBox.height > enemyBox.y
			) {
				enemy.markedForDeletion = true;
				this.game.collisions.push(
					new Collision(
						this.game,
						enemy.x + enemy.width * 0.5,
						enemy.y + enemy.height * 0.5
					)
				);

				if (this.currentState === this.states[5]) {
					this.game.score++;
					return;
				}

				this.game.lives--;

				this.setState(states[PLAYER_STATE.HIT], 0);

				if (this.game.lives <= 0) {
					this.game.gameOver = true;
				}
			}
		});
	}

	getCollisionBox() {
		return {
			x: this.x + this.width * 0.1,
			y: this.y + (this.isSitting() ? this.height / 2 : 0),
			width: this.width * 0.6,
			height: this.height * (this.isSitting() ? 0.5 : 1),
		};
	}

	reset() {
		this.x = 20;
		this.y = this.game.height - this.height - this.game.groundMargin;
		this.frameTimer = 0;
		this.vy = 0;
		this.speed = 0;

		this.currentState = this.states[0];
		this.currentState.enter();
	}
}
