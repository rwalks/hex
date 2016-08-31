function ArtManager() {

  var staticArt = {};
  var procArt = {};

  var tileArt = new TileArt();
  var cursorArt = new CursorArt();
  var unitArt = new UnitArt();

  this.init = function() {
    tileArt.load(staticArt);
    cursorArt.load(staticArt);
    unitArt.load(staticArt);
    updateSizes();
  }

  this.getArt = function(name){
    return staticArt[name];
  }

  function updateSizes(){
    var artKeys = Object.keys(staticArt);
    for(var a = 0; a < artKeys.length; a++){
      staticArt[artKeys[a]].updateSize();
    }
    return true;
  }
}

function Art() {

  this.size;

  this.draw = function(origin, context) {}

}

function CachedArt(){
  Art.call(this);

  this.canvas = document.createElement('canvas');
  this.context = this.canvas.getContext('2d');

  this.updateSize = function(){
    var sX = this.size.x;
    var sY = this.size.y;
    this.canvas.width = sX;
    this.canvas.height = sY;
    this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
    this.drawCanvas();
  }

  this.clearContext = function() {
    this.context.clearRect(0, 0, this.size.x, this.size.y);
  }

  this.drawCanvas = function(){};

  this.draw = function(pos,canvasContext){
    canvasContext.save();
    canvasContext.translate(pos.x,pos.y);
    canvasContext.drawImage(this.canvas,0,0);
    canvasContext.restore();
  }
}
