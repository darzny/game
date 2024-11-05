import { GAME_KEY } from "./keys.js";
import { Dust, Fire, Splash } from "./particles.js";

export const PLAYER_STATE = {
	STAY: "STAY",
	JUMP: "JUMP",
	FALL: "FALL",
	RUN: "RUN",
	SIT: "SIT",
	ROLL: "ROLL",
	HIT: "HIT",
};

export const states = {
	[PLAYER_STATE.STAY]: 0,
	[PLAYER_STATE.JUMP]: 1,
	[PLAYER_STATE.FALL]: 2,
	[PLAYER_STATE.RUN]: 3,
	[PLAYER_STATE.SIT]: 4,
	[PLAYER_STATE.ROLL]: 5,
	[PLAYER_STATE.HIT]: 6,
};

class State {
	constructor(state, game) {
		this.state = state;
		this.game = game;
	}
}

export class Stay extends State {
	constructor(game) {
		super(PLAYER_STATE.STAY, game);
	}

	enter() {
		this.game.player.frameX = 0;
		this.game.player.frameYCoordinate = 302;
		this.game.player.maxFrame = 9;
		this.game.player.spriteWidth = 320.5;
		this.game.player.spriteHeight = 271;
	}

	handleInput(input) {
		if (input.includes(GAME_KEY.UP)) {
			this.game.player.setState(states[PLAYER_STATE.JUMP], 1);
		} else if (input.includes(GAME_KEY.RIGHT)) {
			this.game.player.setState(states[PLAYER_STATE.RUN], 1);
		} else if (input.includes(GAME_KEY.DOWN)) {
			this.game.player.setState(states[PLAYER_STATE.SIT], 1);
		} else if (input.includes(GAME_KEY.SPACE)) {
			this.game.player.setState(states[PLAYER_STATE.ROLL], 1);
		}
	}
}

export class Jump extends State {
	constructor(game) {
		super(PLAYER_STATE.STAY, game);
	}

	enter() {
		if (this.game.player.isOnTheGround()) {
			this.game.player.vy -= this.game.player.maxVy;
		}

		this.game.player.frameX = 0;
		this.game.player.frameYCoordinate = 573;
		this.game.player.maxFrame = 4;

		this.game.player.spriteWidth = 320.5;
		this.game.player.spriteHeight = 271;
	}

	handleInput(input) {
		if (this.game.player.vy > this.game.player.weight) {
			this.game.player.setState(states[PLAYER_STATE.FALL], 1);
		} else if (input.includes(GAME_KEY.SPACE)) {
			this.game.player.setState(states[PLAYER_STATE.ROLL], 1);
		}
	}
}

export class Fall extends State {
	constructor(game) {
		super(PLAYER_STATE.STAY, game);
	}

	enter() {
		this.game.player.frameX = 5;
		this.game.player.frameYCoordinate = 573;
		this.game.player.maxFrame = 9;

		this.game.player.spriteWidth = 320.5;
		this.game.player.spriteHeight = 271;
	}

	handleInput(input) {
		if (this.game.player.isOnTheGround()) {
			this.game.player.setState(states[PLAYER_STATE.RUN], 1);
		}
	}
}

export class Run extends State {
	constructor(game) {
		super(PLAYER_STATE.STAY, game);
	}

	enter() {
		this.game.player.frameX = 0;
		this.game.player.frameYCoordinate = 1115;
		this.game.player.maxFrame = 7;

		this.game.player.spriteWidth = 320.5;
		this.game.player.spriteHeight = 271;
	}

	handleInput(input) {
		this.game.particles.unshift(
			new Dust(
				this.game,
				this.game.player.x + this.game.player.width / 2,
				this.game.player.y + this.game.player.height
			)
		);

		if (!input.includes(GAME_KEY.RIGHT)) {
			this.game.player.setState(states[PLAYER_STATE.STAY], 0);
		} else if (input.includes(GAME_KEY.DOWN)) {
			this.game.player.setState(states[PLAYER_STATE.SIT], 1);
		} else if (input.includes(GAME_KEY.UP)) {
			this.game.player.setState(states[PLAYER_STATE.JUMP], 1);
		} else if (input.includes(GAME_KEY.SPACE)) {
			this.game.player.setState(states[PLAYER_STATE.ROLL], 1);
		}
	}
}

export class Sit extends State {
	constructor(game) {
		super(PLAYER_STATE.STAY, game);
	}

	enter() {
		this.game.player.frameYCoordinate = 1386;
		this.game.player.maxFrame = 4;
		this.game.player.frameX = 0;

		this.game.player.spriteWidth = 320.5;
		this.game.player.spriteHeight = 271;
	}

	handleInput(input) {
		if (!input.includes(GAME_KEY.DOWN)) {
			this.game.player.setState(states[PLAYER_STATE.STAY], 0);
		} else if (input.includes(GAME_KEY.SPACE)) {
			this.game.player.setState(states[PLAYER_STATE.ROLL], 1);
		}
	}
}

export class Roll extends State {
	constructor(game) {
		super(PLAYER_STATE.ROLL, game);
	}

	enter() {
		this.game.player.frameX = 0;
		this.game.player.frameYCoordinate = 1115;
		this.game.player.maxFrame = 6;

		this.game.player.spriteWidth = 320.5;
		this.game.player.spriteHeight = 271;
	}

	handleInput(input) {
		this.game.particles.unshift(
			new Fire(
				this.game,
				this.game.player.x + this.game.player.width * 0.5,
				this.game.player.y + this.game.player.height * 0.5
			)
		);

		if (!input.includes(GAME_KEY.SPACE) && this.game.player.isOnTheGround()) {
			this.game.player.setState(states[PLAYER_STATE.RUN], 1);
		} else if (
			!input.includes(GAME_KEY.SPACE) &&
			!this.game.player.isOnTheGround()
		) {
			this.game.player.setState(states[PLAYER_STATE.FALL], 1);
		} else if (
			input.includes(GAME_KEY.SPACE) &&
			input.includes(GAME_KEY.UP) &&
			this.game.player.isOnTheGround()
		) {
			this.game.player.vy -= 27;
		} else if (
			input.includes(GAME_KEY.DOWN) &&
			!this.game.player.isOnTheGround()
		) {
			this.game.player.setState(states[PLAYER_STATE.DIVE], 0);
		}
	}
}

export class Hit extends State {
	constructor(game) {
		super(PLAYER_STATE.HIT, game);
	}

	enter() {
		this.game.player.frameX = 0;
		this.game.player.frameYCoordinate = 0;
		this.game.player.maxFrame = 9;

		this.game.player.spriteWidth = 302.5;
		this.game.player.spriteHeight = 302;
	}

	handleInput(input) {
		if (
			this.game.player.frameX >= this.game.player.maxFrame &&
			this.game.player.isOnTheGround()
		) {
			this.game.player.setState(states[PLAYER_STATE.RUN], 1);
		} else if (
			this.game.player.frameX >= this.game.player.maxFrame &&
			!this.game.player.isOnTheGround()
		) {
			this.game.player.setState(states[PLAYER_STATE.FALL], 1);
		}
	}
}
