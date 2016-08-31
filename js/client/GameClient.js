function GameClient() {
  var This = this;

  var mainCanvas = document.getElementById('mainCanvas');
  var controls = new Controls( mainCanvas );
  var graphics = new GraphicsEngine( mainCanvas );
  //scenes
  var scene;

  function init() {
    graphics.init();
    controls.init();
    This.setScene(new IntroScene(This, graphics, controls));
    return true;
  }

  function tick(){
    scene.draw();
    controls.update();
  }

  this.run = function () {
    if (init()) {
      setInterval(function() { tick() }, 1000 / config.fps);
    }
  }

  this.setScene = function(nextScene) {
    scene = nextScene;
    scene.load();
  }

}
