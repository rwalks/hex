function GameSetupScene(client, graphics, controls, gameConfig) {
  Scene.call(this, client, graphics, controls);

  var menuAction = false;

  var mapSizeSelector;
  var aiCountSelector;
  var difficultySelector;
  var teamSelector;

  this.loadScene = function() {
    this.sceneElements.push(new HeaderElement("Configure Game", 0, config.canvasSize.y * 0.1));
    this.sceneElements.push(new MsgElementCenter("Map Size", 0, config.canvasSize.y * 0.25));
    mapSizeSelector = new SelectorButtons(["Small","Medium","Large"],config.canvasSize.y * 0.31);
    this.sceneElements.push(mapSizeSelector);
    this.sceneElements.push(new MsgElementCenter("AI Players", 0, config.canvasSize.y * 0.39));
    aiCountSelector = new SelectorButtons([1,2,3,4,5],config.canvasSize.y * 0.45);
    this.sceneElements.push(aiCountSelector);
    this.sceneElements.push(new MsgElementCenter("Difficulty", 0, config.canvasSize.y * 0.53));
    difficultySelector = new SelectorButtons(["Scrub","Normal","Pro"],config.canvasSize.y * 0.59);
    this.sceneElements.push(difficultySelector);
    this.sceneElements.push(new MsgElementCenter("Teams", 0, config.canvasSize.y * 0.67));
    teamSelector = new SelectorButtons(["Off","Dynamic","Permanent"],config.canvasSize.y * 0.73);
    this.sceneElements.push(teamSelector);
    this.sceneElements.push(new DualButtons("Back", backMenu, "Next", chooseTeam, config.canvasSize.y * 0.88));
    if (gameConfig) {
      //hotseat game
      mapSizeSelector.setValue(gameConfig.mapSize);
      difficultySelector.setValue(gameConfig.difficulty);
      var teamOpt = !gameConfig.teamGame ? "Off" : (gameConfig.permanentTeams ? "Permanent" : "Dynamic");
      teamSelector.setValue(teamOpt);
    } else {
      //single player game
      gameConfig = new GameConfig();
      gameConfig.setHumans(1);
    }
    //set max ai option
    var minAi = gameConfig.humanCount > 1 ? 0 : 1;
    var maxAi = config.maxPlayers - gameConfig.humanCount;
    var ais = [];
    for (var a = minAi; a <= maxAi; a++) {
      ais.push(a);
    }
    aiCountSelector.setValues(ais);
    aiCountSelector.setValue(gameConfig.computerCount || minAi);
  }

  function chooseTeam() {
    menuAction = "team";
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
      case "team":
        return new PickCultureScene(client, graphics, controls, gameConfig);
        break;
      case "back":
        return gameConfig.hotseatGame ? new HotseatScene(client, graphics, controls, gameConfig) : new MenuScene(client, graphics, controls);
        break;
      default:
        //electron.app.quit();
    }
  };

  function updateGameConfig() {
    gameConfig.mapSize = mapSizeSelector.getValue();
    gameConfig.setComputers(aiCountSelector.getValue());
    gameConfig.difficulty = difficultySelector.getValue();
    var teamOpt = teamSelector.getValue();
    gameConfig.teamGame = teamOpt != "Off";
    gameConfig.permanentTeams = teamOpt == "Permanent";
  }

}
