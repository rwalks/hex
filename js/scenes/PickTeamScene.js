function PickTeamScene(client, graphics, controls, gameConfig) {
  Scene.call(this, client, graphics, controls);

  var menuAction = false;

  var selectors = [];

  this.loadScene = function() {
    this.sceneElements.push(new HeaderElement("Teams", 0, config.canvasSize.y * 0.05));
    var totalPlayers = gameConfig.humanCount + gameConfig.computerCount;
    var player;
    var title;
    var selector;
    var py = 0.15;
    for (var p = 0; p < totalPlayers; p++) {
      if (p < gameConfig.humanCount) {
        player = gameConfig.humans[p];
        title = "Human " + (p + 1);
      } else {
        player = gameConfig.computers[p - gameConfig.humanCount];
        title = "Computer " + (p + 1);
      }
      this.sceneElements.push(new MsgElementCenter(title, 0, config.canvasSize.y * py));
      selector = new SelectorButtons([1,2,3,4,5,6],config.canvasSize.y * (py + 0.05));
      selector.setValue(player.team);
      selectors.push(selector);
      this.sceneElements.push(selector);
      py += 0.12;
    }
    this.sceneElements.push(new DualButtons("Back", backMenu, "Start", gameStart, config.canvasSize.y * 0.88));
  }

  function gameStart() {
    var validTeams = false;
    var lastTeam;
    iterateArray(selectors, function (sel) {
      if (!lastTeam) {
        lastTeam = sel.getValue();
      } else {
        if ( sel.getValue() != lastTeam ) {
          validTeams = true;
        }
      }
    });
    if (validTeams) {
      menuAction = "game";
    }
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
      case "game":
        return new GameScene(client, graphics, controls, gameConfig);
        break;
      case "back":
        return new PickCultureScene(client, graphics, controls, gameConfig, gameConfig.humanCount);
        break;
      default:
        //electron.app.quit();
    }
  };

  function updateGameConfig() {
    var totalPlayers = gameConfig.humanCount + gameConfig.computerCount;
    for (var p = 0; p < totalPlayers; p++) {
      if (p < gameConfig.humanCount) {
        gameConfig.humans[p].team = selectors[p].getValue();
      } else {
        gameConfig.computers[p - config.humanCount] = selectors[p].getValue();
      }
    }
  }

}
