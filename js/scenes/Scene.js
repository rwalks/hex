function Scene(client, graphics, controls) {

  var transition = false;
  this.sceneElements = [];

  this.load = function() {
    controls.reset();
    this.loadScene();
  }

  this.draw = function() {
    transition = this.drawScene();
    if ( transition ) {
      this.transitionScene();
    }
  }

  this.transitionScene = function() {
    iterateArray(this.sceneElements, function(ele) {
      ele.remove();
    });
    client.setScene(this.getNextScene());
  }

  this.loadScene = function() {};
  this.drawScene = function() {};
  this.getNextScene = function() {};

}
