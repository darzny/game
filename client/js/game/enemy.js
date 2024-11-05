class Enemy {
	constructor() {
		this.frameX = 0;
		this.frameY = 0;
		this.fps = 20;

		this.frameInterval = 1000 / this.fps;
		this.frameTimer = 0;
		this.markedForDeletion = false;
	}
	update(deltatime) {
		this.x -= this.speedX + this.game.speed;
		this.y += this.speedY;

		if (this.frameTimer >= this.frameInterval) {
			this.frameTimer = 0;
			if (this.frameX < this.maxFrame) {
				this.frameX++;
			} else {
				this.frameX = 0;
			}
		} else {
			this.frameTimer += deltatime;
		}

		if (this.x + this.width < 0) {
			this.markedForDeletion = true;
		}
	}

	draw(context) {
		if (this.game.debug) {
			context.strokeRect(this.x, this.y, this.width, this.height);
		}
		context.drawImage(
			this.image,
			this.frameX * this.spriteWidth,
			0,
			this.spriteWidth,
			this.spriteHeight,
			this.x,
			this.y,
			this.width,
			this.height
		);
	}
}

export class FlyingEnemy extends Enemy {
	constructor(game) {
		super();

		this.game = game;
		this.spriteWidth = 85;
		this.spriteHeight = 88;

		this.sizeModifier = 0.7;

		this.width = this.spriteWidth * this.sizeModifier;
		this.height = this.spriteHeight * this.sizeModifier;

		this.x = this.game.width;
		this.y = Math.random() * this.game.height * 0.5;

		this.speedX = Math.random() + 2;
		this.speedY = 0;
		this.maxFrame = 5;

		this.image = document.getElementById("enemyFly");

		this.angle = 0;
		this.va = Math.random() * 0.5 + 0.1;
	}

	update(deltatime) {
		super.update(deltatime);
		this.angle += this.va;
		this.y += Math.sin(this.angle);
	}
}

export class GroundEnemy extends Enemy {
	constructor(game) {
		super();

		this.game = game;
		this.spriteWidth = 291;
		this.spriteHeight = 297;

		this.sizeModifier = 0.4;

		this.width = this.spriteWidth * this.sizeModifier;
		this.height = this.spriteHeight * this.sizeModifier;

		this.fps = 15;

		this.x = this.game.width;
		this.y = this.game.height - this.height - this.game.groundMargin;

		this.image = document.getElementById("enemyMonster");
		this.speedX = 0;
		this.speedY = 0;

		this.maxFrame = 1;
	}
}

export class ClimbingEnemy extends Enemy {
	constructor(game) {
		super();

		this.game = game;
		this.spriteWidth = 120;
		this.spriteHeight = 110;

		this.sizeModifier = 0.7;

		this.width = this.spriteWidth * this.sizeModifier;
		this.height = this.spriteHeight * this.sizeModifier;

		this.x = this.game.width;
		this.y = Math.random() * this.game.height * 0.5;

		this.image = document.getElementById("enemySpider");

		this.speedX = 0;
		this.speedY = Math.random() > 0.5 ? 1 : -1;
		this.maxFrame = 0;
	}

	update(deltatime) {
		super.update(deltatime);

		if (this.y > this.game.height - this.height - this.game.groundMargin) {
			this.speedY *= -1;
		}

		if (this.y < -this.height) {
			this.markedForDeletion = true;
		}
	}

	draw(context) {
		super.draw(context);

		context.beginPath();
		context.moveTo(this.x + this.width / 2, 0);
		context.lineTo(this.x + this.width / 2, this.y + 50);
		context.stroke();
	}
}
