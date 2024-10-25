export class UI {
	constructor(game) {
		this.game = game;
		this.fontSize = 30;
		this.fontFamily = "Helvetica";

		this.lifeImage = document.getElementById("heart");
	}

	draw(context) {
		context.save();

		context.shadowOffsetX = 2;
		context.shadowOffsetY = 2;

		context.shadowColor = "white";
		context.shadowBlur = 0;

		context.font = `${this.fontSize}px ${this.fontFamily}`;
		context.textAlign = "left";
		context.fillStyle = this.game.fontColor;

		context.fillText(`Score: ${this.game.score}`, 20, 50);

		context.font = `${this.fontSize * 0.8}px ${this.fontFamily}`;
		context.fillText(`Time: ${(this.game.time / 1000).toFixed(1)}`, 20, 80);

		for (let i = 0; i < this.game.lives; i++) {
			context.drawImage(
				this.lifeImage,
				this.game.width - 20 - 25 * (this.game.lives - i),
				30,
				25,
				25
			);
		}

		if (this.game.gameOver) {
			context.textAlign = "center";
			context.font = `${this.fontSize * 2}px ${this.fontFamily}`;

			if (
				this.game.score > this.game.winningScore &&
				this.game.time >= this.game.maxTime
			) {
				context.fillText(
					"You win!",
					this.game.width * 0.5,
					this.game.height * 0.5
				);
			} else {
				context.fillText(
					"Game Over",
					this.game.width * 0.5,
					this.game.height * 0.5
				);

				context.font = `${this.fontSize * 0.8}px ${this.fontFamily}`;
				context.fillText(
					"Press Enter to restart",
					this.game.width * 0.5,
					this.game.height * 0.5 + 60
				);
			}
		}

		context.restore();
	}
}
