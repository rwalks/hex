function MenuScene(client, graphics, controls) {
  Scene.call(this, client, graphics, controls);

  var menuAction = false;

  this.loadScene = function() {
    this.sceneElements.push(new MsgElementCenter("Single Player", 0, config.canvasSize.y * 0.3, spMenu));
    this.sceneElements.push(new MsgElementCenter("Hotseat", 0, config.canvasSize.y * 0.45, hotseatMenu));
    this.sceneElements.push(new MsgElementCenter("Settings", 0, config.canvasSize.y * 0.6, configMenu));
    this.sceneElements.push(new MsgElementCenter("Exit", 0, config.canvasSize.y * 0.75, exitAction));
  }

  function spMenu() {
    menuAction = "sp";
  }

  function hotseatMenu() {
    menuAction = "hotseat";
  }

  function configMenu() {
    menuAction = "config";
  }

  function exitAction() {
    //electron.app.quit();
  }

  this.drawScene = function() {
    graphics.drawMenu();
    return menuAction != false;
  }

  this.getNextScene = function() {
    switch (menuAction ) {
      case "sp":
        return new GameSetupScene(client, graphics, controls);
        break;
      case "hotseat":
        return new HotseatScene(client, graphics, controls);
        break;
      case "config":
        return new ConfigScene(client, graphics, controls);
        break;
      default:
        //electron.app.quit();
    }
  };


}
