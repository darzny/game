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

		context.fillText(`Очки: ${this.game.score}`, 20, 50);

		context.font = `${this.fontSize * 0.8}px ${this.fontFamily}`;
		context.fillText(`Время: ${(this.game.time / 1000).toFixed(1)}`, 20, 80);

		for (let i = 0; i < this.game.lives; i++) {
			context.drawImage(
				this.lifeImage,
				this.game.width - 20 - 25 * (this.game.lives - i),
				30,
				25,
				25
			);
		}

		if (!this.game.isStarted && this.game.gameOver === null) {
			context.textAlign = "center";
			context.fillText(
				"Нажмите Enter чтобы начать игру",
				this.game.width * 0.5,
				80
			);

			context.font = `${this.fontSize * 0.6}px ${this.fontFamily}`;

			context.fillText("Управление:", this.game.width * 0.5, 130);
			context.fillText("Вперед: →", this.game.width * 0.5, 160);
			context.fillText("Скользить: ↓", this.game.width * 0.5, 190);
			context.fillText("Прыжок: ↑", this.game.width * 0.5, 220);
			context.fillText("Атака: пробел", this.game.width * 0.5, 250);
		}

		if (this.game.gameOver) {
			context.textAlign = "center";
			context.font = `${this.fontSize * 2}px ${this.fontFamily}`;

			if (
				this.game.score > this.game.winningScore &&
				this.game.time >= this.game.maxTime
			) {
				context.fillText(
					"Вы выиграли!",
					this.game.width * 0.5,
					this.game.height * 0.5
				);
			} else {
				context.fillText(
					"Вы проиграли",
					this.game.width * 0.5,
					this.game.height * 0.5 - 60
				);

				context.font = `${this.fontSize * 0.8}px ${this.fontFamily}`;
				context.fillText(
					"Нажмите Enter чтобы начать заново",
					this.game.width * 0.5,
					this.game.height * 0.5
				);
			}
		}

		context.restore();
	}
}
