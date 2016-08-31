function TileArt() {

  this.load = function(staticArt) {
    //height specific cases
    staticArt['b2'] = new BeachHexArt(2);
    staticArt['d1'] = new DeepHexArt(1);
    staticArt['m'+config.maxTileHeight] = new GrassHexArt(config.maxTileHeight);
    //general tiles
    for (var h = 0; h <= config.maxTileHeight; h++) {
      staticArt['g'+h] = new GrassHexArt(h);
      staticArt['w'+h] = new WaterHexArt(h);
    }
  }

  function HexTileArt() {
    CachedArt.call(this);
    this.offset = Vec(0,0);

    this.draw = function(pos,canvasContext){
      canvasContext.save();
      canvasContext.translate(pos.x-this.offset.x,pos.y-this.offset.y);
      canvasContext.drawImage(this.canvas,0,0);
      canvasContext.restore();
    }
  }

  function GrassHexArt(height) {
    HexTileArt.call(this);

    var scale = config.tileSize;
    var heightOffset = height * config.tileHeight;
    this.offset.x = heightOffset;
    this.offset.y = heightOffset;
    this.size = Vec(scale+this.offset.x,scale+this.offset.y);

    var r = Math.floor(70 - (height * 10));
    var g = Math.floor(250 - (height * 20));
    var b = Math.floor(70 - (height * 10));

    this.strokeColor = "rgb("+r+","+255+","+b+")";
    this.panelColor1 = "rgb("+(r-15)+","+(g-15)+","+(b-15)+")";
    this.panelColor2 = "rgb("+(r-10)+","+(g-10)+","+(b-10)+")";
    this.panelColor3 = "rgb("+(r-5)+","+(g-5)+","+(b-5)+")";
    this.hexColor = "rgb("+r+","+g+","+b+")";

    this.drawHex = function(){
      var hex = new Hexagon().geo;
      var scale = config.tileSize;
      //origin at center of canvas adjusted for height
      var origin = Vec(
        this.offset.x + (scale / 2),
        this.offset.y + (scale / 2)
      );
      var hPos = Vec(
          origin.x - this.offset.x,
          origin.y - this.offset.y
      );
      this.context.lineWidth = 1;
      this.context.strokeStyle = this.strokeColor;
      if ( heightOffset > 0) {
        //draw panels
        this.drawPanel(origin, hPos, hex, scale, 1, 0, this.panelColor1);
        this.drawPanel(origin, hPos, hex, scale, 0, 5, this.panelColor2);
        this.drawPanel(origin, hPos, hex, scale, 5, 4, this.panelColor3);
        //draw surface
        this.context.beginPath();
        this.context.fillStyle = this.hexColor;
        drawGeo(hex, hPos, scale, this.context);
        this.context.stroke();
        this.context.fill();
      }
    }

    this.drawPanel = function(origin, hPos, hex, scale, index1, index2, fill) {
      var px; var py;
      this.context.beginPath();
      this.context.fillStyle = fill;
      px = origin.x + (hex[index1].x * (scale / 2));
      py = origin.y + (hex[index1].y * (scale / 2));
      this.context.moveTo(px,py);
      px = hPos.x + (hex[index1].x * (scale / 2));
      py = hPos.y + (hex[index1].y * (scale / 2));
      this.context.lineTo(px,py);
      px = hPos.x + (hex[index2].x * (scale / 2));
      py = hPos.y + (hex[index2].y * (scale / 2));
      this.context.lineTo(px,py);
      px = origin.x + (hex[index2].x * (scale / 2));
      py = origin.y + (hex[index2].y * (scale / 2));
      this.context.lineTo(px,py);
      px = origin.x + (hex[index1].x * (scale / 2));
      py = origin.y + (hex[index1].y * (scale / 2));
      this.context.lineTo(px,py);
      this.context.fill();
    }

    this.drawCanvas = function() { this.drawHex(); }
  }

  function BeachHexArt(height) {
    GrassHexArt.call(this,height);

    this.strokeColor = "rgb(250,250,0)";
    this.panelColor1 = "rgb(140,140,35)";
    this.panelColor2 = "rgb(160,160,40)";
    this.panelColor3 = "rgb(190,190,45)";
    this.hexColor = colors.yellow;
  }

  function WaterHexArt(height) {
    HexTileArt.call(this);

    var scale = config.tileSize;
    var heightOffset = height * config.tileHeight;
    this.offset.x = heightOffset;
    this.offset.y = heightOffset;
    this.size = Vec(
        scale+this.offset.x,
        scale+this.offset.y
    );

    this.strokeColor = "rgb(0,0,250)";
    this.bottomColor = "rgb(150,150,50)";
    this.surfaceColor = "rgba(30,30,200,0.5)";

    this.drawHex = function() {
      var hex = new Hexagon().geo;
      var scale = config.tileSize;
      //height
      var origin = Vec(
        heightOffset + (scale / 2),
        heightOffset + (scale / 2)
      );
      var hPos = Vec(
          origin.x - heightOffset,
          origin.y - heightOffset
      );
      var bPos = Vec(
          hPos.x + config.tileHeight,
          hPos.y + config.tileHeight
      );
      this.context.lineWidth = 1;
      this.context.strokeStyle = this.strokeColor;
      //river bottom
      this.context.beginPath();
      this.context.fillStyle = this.bottomColor;
      drawGeo(hex, bPos, scale, this.context);
      //this.context.stroke();
      this.context.fill();
      //water surface
      this.context.beginPath();
      this.context.fillStyle = this.surfaceColor;
      drawGeo(hex, hPos, scale, this.context);
      this.context.stroke();
      this.context.fill();
    }

    this.drawCanvas = function() { this.drawHex(); }
  }

  function DeepHexArt(height) {
    WaterHexArt.call(this,height);

    this.bottomColor = "rgb(20,20,100)";
  }

}
