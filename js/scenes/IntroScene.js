function IntroScene(client, graphics, controls) {
  Scene.call(this, client, graphics, controls);

  var titleA = 0;
  var t1; var t2; var t3;

  this.loadScene = function() {
    t1 = new TitleElementCenter("Lords", 0, config.canvasSize.y * 0.05);
    t2 = new TitleElementCenter("of", 0, config.canvasSize.y * 0.3);
    t3 = new TitleElementCenter("Tactics", 0, config.canvasSize.y * 0.55);
    this.sceneElements.push(t1);
    this.sceneElements.push(t2);
    this.sceneElements.push(t3);
  }

  this.drawScene = function() {
    titleA = titleA < 1 ? titleA + 0.001 : 1;
    var color = "rgba(255,0,255,"+titleA+")";
    t1.setOutline(color);
    t2.setOutline(color);
    t3.setOutline(color);
    graphics.drawIntro();
    return controls.anyInteraction();
  }

  this.getNextScene = function() {
    return new MenuScene(client, graphics, controls);
  };

}
