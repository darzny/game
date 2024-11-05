import Player from "./player.js";
import InputHandler from "./input.js";
import Background from "./background.js";
import { UI } from "./ui.js";

import { FlyingEnemy, GroundEnemy, ClimbingEnemy } from "./enemy.js";

export default class Game {
	constructor(width, height) {
		this.width = width;
		this.height = height;

		this.groundMargin = 60;

		this.speed = 0;
		this.maxSpeed = 6;

		this.fontColor = "black";

		this.player = new Player(this);
		this.input = new InputHandler(this);
		this.background = new Background(this);
		this.UI = new UI(this);

		this.enemies = [];
		this.enemyTimer = 0;
		this.enemyInterval = 2000;

		this.debug = false;

		this.particles = [];
		this.maxParticles = 50;

		this.collisions = [];

		this.score = 0;
		this.winningScore = 40;

		this.time = 0;
		this.maxTime = 100000;
		this.lives = 3;

		this.gameOver = null;
		this.isStarted = false;

		this.player.currentState = this.player.states[0];
		this.player.currentState.enter();
	}

	update(deltatime) {
		this.time += deltatime;

		if (this.time > this.maxTime) {
			this.gameOver = true;
		}

		this.background.update();
		this.player.update(this.input.keys, deltatime);

		if (this.enemyTimer >= this.enemyInterval) {
			this.enemyTimer = 0;

			this.addEnemy();
		} else {
			this.enemyTimer += deltatime;
		}

		this.enemies.forEach((enemy, index) => {
			enemy.update(deltatime);
		});

		this.particles.forEach((particle, index) => {
			particle.update();
		});

		this.collisions.forEach((collision, index) => {
			collision.update(deltatime);
		});

		this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion);

		this.particles = this.particles.filter(
			(particle) => !particle.markedForDeletion
		);
		this.collisions = this.collisions.filter(
			(collision) => !collision.markedForDeletion
		);
	}

	draw(context) {
		this.background.draw(context);

		this.player.draw(context);

		this.enemies.forEach((enemy) => enemy.draw(context));

		this.particles.forEach((particle) => {
			particle.draw(context);
		});

		if (this.particles.length > this.maxParticles) {
			this.particles.length = this.maxParticles;
		}

		this.collisions.forEach((collision) => {
			collision.draw(context);
		});

		this.UI.draw(context);
	}

	addEnemy() {
		if (this.speed > 0 && Math.random() < 0.5) {
			this.enemies.push(new GroundEnemy(this));
		} else if (this.speed > 0) {
			this.enemies.push(new ClimbingEnemy(this));
		}

		this.enemies.push(new FlyingEnemy(this));
	}

	restartGame() {
		this.speed = 0;
		this.enemies = [];
		this.enemyTimer = 0;
		this.particles = [];
		this.collisions = [];

		this.score = 0;
		this.time = 0;

		this.gameOver = false;
		this.lives = 3;

		this.player.reset();

		this.background.x = 0;
		this.background.y = 0;
	}
}
