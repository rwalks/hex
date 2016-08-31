function HotseatScene(client, graphics, controls, gameConfig) {
  Scene.call(this, client, graphics, controls);

  var menuAction = false;

  var humanCountSelector;

  this.loadScene = function() {
    this.sceneElements.push(new HeaderElement("Hotseat", 0, config.canvasSize.y * 0.1));
    this.sceneElements.push(new MsgElementCenter("Human Players", 0, config.canvasSize.y * 0.25));
    humanCountSelector = new SelectorButtons([1,2,3,4,5,6],config.canvasSize.y * 0.31);
    this.sceneElements.push(humanCountSelector);
    this.sceneElements.push(new DualButtons("Back", backMenu, "Next", setupGame, config.canvasSize.y * 0.88));
    if (gameConfig) {
      humanCountSelector.setValue(gameConfig.humanCount);
    } else {
      gameConfig = new GameConfig();
      gameConfig.hotseatGame = true;
    }
  }

  function setupGame() {
    menuAction = "setup";
  }

  function backMenu() {
    menuAction = "back";
  }

  this.drawScene = function() {
    graphics.drawMenu();
    return menuAction != false;
  }

  this.getNextScene = function() {
    updateGameConfig();
    switch (menuAction ) {
      case "setup":
        return new GameSetupScene(client, graphics, controls, gameConfig);
        break;
      case "back":
        return new MenuScene(client, graphics, controls);
        break;
      default:
        //electron.app.quit();
    }
  };

  function updateGameConfig() {
    gameConfig.setHumans(humanCountSelector.getValue());
  }


}
