
window.board = [];
Game = {
	status: true,
	iterations: 0,
	interval: 1000,
	// This defines our grid's size and the size of each of its tiles
	map_grid: {
		width: 42,
		height: 36,
		tile: {
			width: 16,
			height: 16
		}
	},
	// The total width of the game screen. Since our grid takes up the entire screen
	//  this is just the width of a tile times the width of the grid
	width: function () {
		return  $('.resp-tabs-container').width();// this.map_grid.width * this.map_grid.tile.width;
	},

	// The total height of the game screen. Since our grid takes up the entire screen
	//  this is just the height of a tile times the height of the grid
	height: function () {
		return  $('.resp-tabs-container').height(); //this.map_grid.height * this.map_grid.tile.height;
	},
	over: function () {
		if (!this.boardChanged) {
			return true;
		}

		for (var j = 0; j < Game.map_grid.width; j++) {
			for (var k = 0; k < Game.map_grid.height; k++) {
				if (board[j][k].attr('state')) {
					return false;
				}
			}
		}
		return true;
	},
	// Initialize and start our game
	start: function () {
		Game.iterations = 0;
		// Start crafty and set a background color so that we can see it's working
		Crafty.init(Game.width(), Game.height(), 'game');
		Crafty.background('rgb(240, 240, 240)');
		// A 2D array to keep track of all tiles
		board = new Array(Game.map_grid.width);
		for (var i = 0; i < Game.map_grid.width; i++) {
			board[i] = new Array(Game.map_grid.height);
			for (var y = 0; y < Game.map_grid.height; y++) {
				board[i][y] = false;
			}
		}
		x = 0; y = 0;
		// Populate the game board with cells
		for (var x = 0; x < Game.map_grid.width; x++) {
			for (var y = 0; y < Game.map_grid.height; y++) {
				if (y < Game.map_grid.height && x < Game.map_grid.width) {
					board[x][y] = Crafty.e('Cell').at(x, y);
				}
			}
		}
		x = 0; y = 0;
		for (var x = 0; x < Game.map_grid.width; x++) {
			for (var y = 0; y < Game.map_grid.height; y++) {
				board[x][y].findNeighbors();

			}
		}
		// Bind method turn to event turn
		// Game.intervalID = window.setInterval(Game.turn, 1000);

	},
	turn: function () {

		if (!Game.over()) {
			Game.iterations += 1;
			this.boardChanged = false
			for (var x = 0; x < Game.map_grid.width; x++) {
				for (var y = 0; y < Game.map_grid.height; y++) {
					board[x][y].calculateState();

				}
			}
			for (var x = 0; x < Game.map_grid.width; x++) {
				for (var y = 0; y < Game.map_grid.height; y++) {
					board[x][y].updateState();

				}
			}
			// setTimeout(function(){Game.turn();}, Game.interval);
		} else {
			// clearInterval(Game.intervalID);
			Crafty.pause();
			alert("Game Over!");
		}

		if (!Game.status) {
			// clearInterval(Game.intervalID);
			// Crafty.pause();
		}


	},
	boardChanged: true
}
