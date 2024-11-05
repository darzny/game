class Layer {
	constructor(game, width, height, speedModifier, image) {
		this.game = game;
		this.width = width;
		this.height = height;
		this.speedModifier = speedModifier;
		this.image = image;
		this.x = 0;
		this.y = 0;
	}

	draw(context) {
		context.drawImage(this.image, this.x, this.y, this.width, this.height);
		context.drawImage(
			this.image,
			this.x + this.width,
			this.y,
			this.width,
			this.height
		);
	}

	update() {
		this.x =
			this.x < -this.width ? 0 : this.x - this.game.speed * this.speedModifier;
	}
}

export default class Background {
	constructor(game) {
		this.game = game;
		this.width = 1667;
		this.height = 500;

		const layerImages = [
			{ id: "layer1", speedModifier: 0 },
			{ id: "layer2", speedModifier: 0.5 },
			{ id: "layer3", speedModifier: 1 },
		];

		this.bgLayers = layerImages.map(({ id, speedModifier }) => {
			const image = document.getElementById(id);
			return new Layer(
				this.game,
				this.width,
				this.height,
				speedModifier,
				image
			);
		});
	}

	update() {
		this.bgLayers.forEach((layer) => layer.update());
	}

	draw(context) {
		this.bgLayers.forEach((layer) => layer.draw(context));
	}
}
