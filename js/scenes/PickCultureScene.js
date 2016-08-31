function PickCultureScene(client, graphics, controls, gameConfig, playerIndex) {
  Scene.call(this, client, graphics, controls);

  var menuAction = false;
  var heroSelector;
  var cultureSelector;
  var teamSelector;

  var nextPlayer = false;

  var heroArt;

  var heroMap = {
    "Magi" : {
      "Warlock" : ['wizard'],
      "Goblin Prince" : ['goblinPrince'],
      "Cyclops" : ['cyclops']
    },
    "Nomads" : {
      "Horse Lord" : ['horseLord'],
      "Dune Shaper" : ['wizard'],
      "Siege Master" : ['wizard']
    },
    "Sentinels" : {
      "Architex" : ['wizard'],
      "Holomancer" : ['wizard'],
      "Warden" : ['wizard']
    }
  };

  this.loadScene = function() {
    playerIndex = playerIndex || 1;
    var playerName = "Player " + playerIndex;
    nextPlayer = playerIndex < gameConfig.humanCount;
    var nextTxt = nextPlayer ? "Next" : (gameConfig.teamGame ? "Teams" : "Start");
    this.sceneElements.push(new HeaderElement(playerName, 0, config.canvasSize.y * 0.1));
    //culture
    this.sceneElements.push(new MsgElementCenter("Culture", 0, config.canvasSize.y * 0.25));
    cultureSelector = new SelectorButtons(Object.keys(heroMap),config.canvasSize.y * 0.31, toggleCulture);
    this.sceneElements.push(cultureSelector);
    //hero
    this.sceneElements.push(new MsgElementCenter("Hero", 0, config.canvasSize.y * 0.39));
    heroSelector = new SelectorButtons(Object.keys(heroMap["Magi"]),config.canvasSize.y * 0.45, toggleHero);
    this.sceneElements.push(heroSelector);
    this.sceneElements.push(new DualButtons("Back", backMenu, nextTxt, gameStart, config.canvasSize.y * 0.88));
    //fill in players race
    cultureSelector.setValue(gameConfig.humans[playerIndex - 1].culture);
    heroSelector.setValue(gameConfig.humans[playerIndex - 1].hero);
    toggleHero(heroSelector.getValue());
  }

  function gameStart() {
    menuAction = "game";
  }

  function backMenu() {
    menuAction = "back";
  }

  function toggleCulture(cult) {
    heroSelector.setValues(Object.keys(heroMap[cult]));
    toggleHero(heroSelector.getValue());
  }

  function toggleHero(hero) {
    var heroInfo = heroMap[cultureSelector.getValue()][hero];
    heroArt = heroInfo[0];
  }

  this.drawScene = function() {
    graphics.drawMenu(heroArt);
    return menuAction != false;
  }

  this.getNextScene = function() {
    updateGameConfig();
    switch (menuAction ) {
      case "game":
        return nextPlayer ? new PickCultureScene(client, graphics, controls, gameConfig, playerIndex + 1) :
          (gameConfig.teamGame ? new PickTeamScene(client, graphics, controls, gameConfig) : new GameScene(client, graphics, controls, gameConfig));
        break;
      case "back":
        return playerIndex > 1 ? new PickCultureScene(client, graphics, controls, gameConfig, playerIndex - 1) : new GameSetupScene(client, graphics, controls, gameConfig);
        break;
      default:
        //electron.app.quit();
    }
  };

  function updateGameConfig() {
    gameConfig.humans[playerIndex - 1].culture = cultureSelector.getValue();
    gameConfig.humans[playerIndex - 1].hero = heroSelector.getValue();
  }

}
