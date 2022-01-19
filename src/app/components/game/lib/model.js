

/**
 * Stratagy Pattern used for initial state of the game.
 * @param  int min [description]
 * @param  int max [description]
 * @return bool   True/False, should this cell start the game alive?
 */
randomSpawnStratagy = function(min, max){
	return function(){
		var i = Math.floor(Math.random() * (max - min + 1) + min);
		if ( i === min){
			return true;
		}else{
			return false;
		}
	}
} 
/**
 * Cell Object.  Most common obj of the game of life.
 * @type {Object}
 */
Cell = {};
Cell.state = false;
Cell.nextState = undefined;
Cell.neighbors = [];
Cell.spawnStratagy = randomSpawnStratagy(3,8);
Cell.x = undefined;
Cell.y = undefined;
Cell.init = function(x,y){
	var myNeighbors = Array();
	this.x = x;
	this.y = y;
	this.state = this.spawnStratagy();

	if( x+1 < Game.map_grid.width ){
		myNeighbors[myNeighbors.length] = Game.board[x+1][y];
	}
	if( x-1 >= 0 ){
		myNeighbors[myNeighbors.length] = Game.board[x-1][y];
	}
	if( y+1 < Game.map_grid.height ){
		myNeighbors[myNeighbors.length] = Game.board[x][y+1];
	}
	if( y-1 >= 0 ){
		myNeighbors[myNeighbors.length] = Game.board[x][y-1];
	}

	if( x-1 >= 0 && y-1>= 0){
		myNeighbors[myNeighbors.length] = Game.board[x-1][y-1];
	}
	if( x+1 < Game.map_grid.width  && y-1>= 0){
		myNeighbors[myNeighbors.length] = Game.board[x+1][y-1];
	}
	if( x-1 >= 0  && y+1 < Game.map_grid.height ){
		myNeighbors[myNeighbors.length] = Game.board[x-1][y+1];
	}
	if( x+1 < Game.map_grid.width  && y+1 < Game.map_grid.height ){
		myNeighbors[myNeighbors.length] = Game.board[x+1][y+1];
	}	
	this.neighbors = myNeighbors.splice(0);

	if(this.neighbors.length>8){
		console.log(x,y);
		debugger;
	}
};

Cell.updateState = function(newState){
	this.state = newState;
	if(this.state){
		Crafty.e('LiveCell').at(this.x, this.y);
	}else{
		Crafty.e('Actor').at(this.x, this.y);
	}
}

Cell.sumNeighbors = function(){
	var sum = 0;
	for(i=0;i<this.neighbors.length;i++){
		if( this.neighbors[i].state ){
			sum++;
		}
	}

	return sum;
}

Cell.deadStrategy = function(){
	if( this.sumNeighbors() ===3 ){
		return true;
	}else{
		return false;
	}
}

Cell.liveStrategy = function(){
	var sum = this.sumNeighbors();
	if( sum === 2 || sum === 3 ){
		return true;
	}else{
		return false;
	}
}

Cell.calculateState = function(){
	if( this.state ){
		this.nextState = this.liveStrategy();
	}else{
		this.nextState = this.deadStrategy();
	}
}
/**
 * Populate the game board with cells
 * @return Array a two dimensional array of cells 
 
Game.board = (function(){
	var x = new Array(Game.Settings.mapsize);
	for (var i = 0; i < Game.Settings.mapsize; i++) {
		x[i] = new Array(Game.Settings.mapsize);
  	}



  	return x;
}() )



  	for (var j = 0; j < Game.Settings.mapsize; j++) {
	  	for (var k = 0; k < Game.Settings.mapsize; k++) {
			Game.board[j][k] = Object.create(Cell);

	  	}
  	}

  	for (var j = 0; j < Game.Settings.mapsize; j++) {
	  	for (var k = 0; k < Game.Settings.mapsize; k++) {
			Game.board[j][k].init(j,k);
	  	}
  	}

 Game.each = function( myFunc ){
	  for (var j = 0; j < Game.Settings.mapsize; j++) {
	  	for (var k = 0; k < Game.Settings.mapsize; k++) {

	  		var ret = myFunc( Game.board[j][k] );
			if( Game.board[j][k].state ){
				return false;
			}
	  	}
  	}
 }
 Game.over = function(){
	  for (var j = 0; j < Game.Settings.mapsize; j++) {
	  	for (var k = 0; k < Game.Settings.mapsize; k++) {
			if( Game.board[j][k].state ){
				return false;
			}
	  	}
  	}
  	return true;
 }

 Game.turn = function(){
 	// Calculate state
	for (var j = 0; j < Game.Settings.mapsize; j++) {
	  	for (var k = 0; k < Game.Settings.mapsize; k++) {
			Game.board[j][k].calculateState();
	  	}
  	}
 	// Update state
	for (var j = 0; j < Game.Settings.mapsize; j++) {
	  	for (var k = 0; k < Game.Settings.mapsize; k++) {
			Game.board[j][k].updateState(Game.board[j][k].nextState);
	  	}
  	}

 }
Game.start = function(){
	var turns = 0;
	while( !Game.over() ){
		Game.turn();

		turns+=1;
	}
	console.log(turns);
}

*/