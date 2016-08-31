function GameEngine() {

  var gameState = new GameState();

  this.init = function() {
    gameState.init();
  }

  this.update = function() {
  //  iterateArray(gameState.units, function(unit) {
  //  });
  }

  this.getState = function() {
    return gameState;
  }

}
