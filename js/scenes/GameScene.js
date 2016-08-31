function GameScene(client, graphics, controls, gameConfig) {
  Scene.call(this, client, graphics, controls);

  var gameEngine = new GameEngine();
  var gui = new Gui();
  var camera = new Camera();

  this.loadScene = function() {
    gameEngine.init();
    graphics.setGameState(gameEngine.getState());
  }

  this.drawScene = function() {
    camera.update(controls);
    gui.update(gameEngine.getState(), controls, camera);
    gameEngine.update();
    graphics.drawGame(gameEngine.getState(), gui, camera);
    return false;
  }

  this.getNextScene = function() {
    return new GameScene(client, graphics, controls);
  };

}
