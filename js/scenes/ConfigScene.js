function ConfigScene(client, graphics, controls) {
  Scene.call(this, client, graphics, controls);

  var menuAction = false;

  this.loadScene = function() {
    this.sceneElements.push(new MsgElementCenter("Toggle Fullscreen", 0, config.canvasSize.y * 0.3, toggleFullscreen));
    this.sceneElements.push(new MsgElementCenter("Back", 0, config.canvasSize.y * 0.5, backAction));
  }

  function toggleFullscreen() {
    config.fullScreen = !config.fullScreen
  //  mainWindow.setFullScreen(config.fullScreen);
  }

  function backAction() {
    menuAction = "back";
  }

  this.drawScene = function() {
    graphics.drawMenu();
    return menuAction != false;
  }

  this.getNextScene = function() {
    return new MenuScene(client, graphics, controls);
  }


}
