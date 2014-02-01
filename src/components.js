// The Grid component allows an element to be located
//  on a grid of tiles
Crafty.c('Grid', {
  init: function() {
    'use strict';
    this.attr({
      w: Game.map_grid.tile.width,
      h: Game.map_grid.tile.height
    });
  },

  // Locate this entity at the given position on the grid
  at: function(x, y) {
    'use strict';
    if (x === undefined && y === undefined) {
      return { x: this.x/Game.map_grid.tile.width, y: this.y/Game.map_grid.tile.height };
    } else {
      this.attr({ x: x * Game.map_grid.tile.width, y: y * Game.map_grid.tile.height });
      return this;
    }
  }
});

// An "Actor" is an entity that is drawn in 2D on canvas
//  via our logical coordinate grid
Crafty.c('Actor', {
  init: function() {
    'use strict';
    this.requires('2D, Canvas, Grid');
  },
});

/**
 * Stratagy Pattern used for initial state of the game.
 * @param  int min [description]
 * @param  int max [description]
 * @return bool   True/False, should this cell start the game alive?
 */
var randomSpawnStratagy = function(min, max){
  'use strict';
  return function(){
    var i = Math.floor(Math.random() * (max - min + 1) + min);
    if ( i === min){
      return true;
    }else{
      return false;
    }
  };
};



// A Cell is just an Actor with a certain color
Crafty.c('Cell', {
  init: function() {
    'use strict';
    this.requires('Actor, Color');
    this.attr({
      state: false,
      nextState: undefined,
      neighbors: [],
    });
    this.attr( 'state', this.spawn() );
    if( this.attr('state') ){
      this.color('rgb(20, 125, 40)');
    }else{
      this.color('rgb(249, 223, 125)');
    }
    
   
       
      
  },
  spawn: randomSpawnStratagy(2,8),
  findNeighbors: function(){
    'use strict';
    var at,x,y,myNeighbors;
    at = this.at();
    x = at.x;
    y = at.y;

    
    myNeighbors = [];

    if( (x+1) < Game.map_grid.width ){
      myNeighbors[myNeighbors.length] = board[x+1][y];
    }

    if( x-1 >= 0 ){
      myNeighbors[myNeighbors.length] = board[x-1][y];
    }

    if( y+1 < Game.map_grid.height ){
      myNeighbors[myNeighbors.length] = board[x][y+1];
    }

    if( y-1 >= 0 ){
      myNeighbors[myNeighbors.length] = board[x][y-1];
    }

    if( x-1 >= 0 && y-1>= 0){
      myNeighbors[myNeighbors.length] = board[x-1][y-1];
    }

    if( x+1 < Game.map_grid.width  && y-1>= 0){
      myNeighbors[myNeighbors.length] = board[x+1][y-1];
    }

    if( x-1 >= 0  && y+1 < Game.map_grid.height ){
      myNeighbors[myNeighbors.length] = board[x-1][y+1];
    }

    if( x+1 < Game.map_grid.width  && y+1 < Game.map_grid.height ){
      myNeighbors[myNeighbors.length] = board[x+1][y+1];
    }
     this.attr( 'neighbors', myNeighbors );
     return myNeighbors;
  },
  sumNeighbors: function(){
    'use strict';
    var neighbors,sum = 0;
    neighbors = this.attr('neighbors');

    for(var i=0;i<neighbors.length;i++){
      if( neighbors[i].attr('state') ){
        sum++;
      }
    }

    return sum;
  },
  deadStrategy: function(){
    'use strict';
    if( this.sumNeighbors() ===3 ){
      return true;
    }else{
      return false;
    }
  },
  liveStrategy: function(){
    'use strict';
    var sum = this.sumNeighbors();
    if( sum === 2 || sum === 3 ){
      return true;
    }else{
      return false;
    }
  },
  calculateState: function(){
    'use strict';
    if( this.attr('state')  ){
      this.attr('nextState', this.liveStrategy() );
    }else{
      this.attr('nextState', this.deadStrategy() );
    }
  },
  updateState: function(){
    'use strict';
    if(this.attr('state') !== this.attr('nextState') ){
      Game.boardChanged = true;
    }
    this.attr('state', this.attr('nextState') );
    if( this.attr('state') ){
      this.color('rgb(20, 125, 40)');
    }else{
      this.color('rgb(249, 223, 125)');
    }
  }
});