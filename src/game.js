var board = [], Game = {
  // This defines our grid's size and the size of each of its tiles
  map_grid: {
    width:  24,
    height: 16,
    tile: {
      width:  16,
      height: 16
    }
  },
  // The total width of the game screen. Since our grid takes up the entire screen
  //  this is just the width of a tile times the width of the grid
  width: function() {
    'use strict';
    return this.map_grid.width * this.map_grid.tile.width;
  },

  // The total height of the game screen. Since our grid takes up the entire screen
  //  this is just the height of a tile times the height of the grid
  height: function() {
    'use strict';
    return this.map_grid.height * this.map_grid.tile.height;
  },
  over: function(){
    'use strict';
	if( !this.boardChanged){
		return true;
	}

	for (var j = 0; j < Game.map_grid.width; j++) {
    for (var k = 0; k < Game.map_grid.height; k++) {
      if( board[j][k].attr('state') ){
        return false;
			}
	  }
  }
  return true;
  },
  // Initialize and start our game
  start: function() {
    'use strict';
    // Start crafty and set a background color so that we can see it's working
    Crafty.init(Game.width(), Game.height());
    Crafty.background('rgb(249, 223, 125)');
  // A 2D array to keep track of all tiles
	board = new Array(Game.map_grid.width);
	for (var i = 0; i < Game.map_grid.width; i++) {
		board[i] = new Array(Game.map_grid.height);
		for (var y = 0; y < Game.map_grid.height; y++) {
		  board[i][y] = false;
		}
  }
  //  x=0;
  //  var y=0;
	// Populate the game board with cells
	for (var x2 = 0; x2 < Game.map_grid.width; x2++) {
	  for (var y2 = 0; y2 < Game.map_grid.height; y2++) {
	   if(y2 < Game.map_grid.height && x2 < Game.map_grid.width){
      board[x2][y2] = Crafty.e('Cell').at(x2, y2);
      }
	  }
	}
    //x=0;y=0;
    for (var x = 0; x < Game.map_grid.width; x++) {
      for ( var y3 = 0; y3 < Game.map_grid.height; y3++) {
          board[x][y3].findNeighbors();
      }
    }
    // Bind method turn to event turn 
	this.intervalID = window.setInterval(Game.turn, 1000);

  },
  turn: function(){
    'use strict';
    if(!Game.over() ){
      this.boardChanged = false;
        for (var x = 0; x < Game.map_grid.width; x++) {
          for (var y = 0; y < Game.map_grid.height; y++) {
            board[x][y].calculateState();
          }
      }
      for ( var x4 = 0; x4 < Game.map_grid.width; x4++) {
        for ( var y4 = 0; y4 < Game.map_grid.height; y4++) {
            board[x4][y4].updateState();
        }
      }
  }else{
    clearInterval(this.intervalID);
    Crafty.pause();
    alert('Game Over!');
  }
  },
  boardChanged: true
};