function CursorArt() {
  this.load = function(staticArt) {
    staticArt['hoverCursor'] = new CursorArt("rgb(255,255,255)");
    staticArt['targetCursor'] = new CursorArt("rgb(255,0,0)");
  }

  function CursorArt(color) {
    CachedArt.call(this);

    var scale = config.tileSize;
    this.strokeColor = color;
    this.size = Vec(scale,scale);

    this.draw = function(pos,canvasContext){
      canvasContext.save();
      canvasContext.translate(pos.x,pos.y);
      canvasContext.drawImage(this.canvas,0,0);
      canvasContext.restore();
    }

    this.drawCanvas = function() {
      var hex = new Hexagon().geo;
      //height
      var origin = Vec(
        (scale / 2),
        (scale / 2)
      );
      this.context.lineWidth = 2;
      this.context.strokeStyle = this.strokeColor;
      this.context.beginPath();
      drawGeo(hex, origin, scale, this.context);
      this.context.stroke();
    }
  }

}
