function GraphicsEngine( mainCanvas ) {
  var This = this;

  var canvases = new CanvasManager( mainCanvas );
  var mapGraphics = new MapGraphics();
  var menuGraphics = new MenuGraphics();
  var art = new ArtManager();
  var mainContext;
  var counter = 0;

  this.init = function() {
    canvases.init();
    mainContext = canvases.getContext("main");
    art.init();
  }

  this.setGameState = function(gameState) {
    mapGraphics.drawMap(art, gameState, canvases.getContext("mapBuffer"));
  }

  this.drawMenu = function(heroArt) {
    canvases.clearContext('main');
    menuGraphics.drawMenu(mainContext);
    if ( heroArt ) {
      menuGraphics.drawHero(mainContext, art.getArt(heroArt));
    }
  }

  this.drawIntro = function() {
    canvases.clearContext('main');
    menuGraphics.drawIntro(mainContext, art);
  }

  this.drawGame = function(gameState, gui, camera) {
    counter += 1;
    counter = counter % (config.fps * 10);
    if(gameState.loaded) {
      //draw game
      var offset = camera.getOffset();
      var zoom = camera.getZoom();
      canvases.clearContext('main');
      mainContext.save();
      mainContext.setTransform(zoom,zoom/2,-zoom,zoom/2,offset.x,offset.y);
      //draw map buffer on main
      mainContext.drawImage(canvases.getCanvas("mapBuffer"),0,0);
      //draw cursor
      gui.drawCursors(mainContext, art);
      gui.drawRange(gameState.map, mainContext, art);
      //draw units
      iterateArray(gameState.units, function(unit) {
        unit.draw(art, mainContext, counter);
      });
      mainContext.restore();
    }
  }

}
