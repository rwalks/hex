function Unit(x,y) {
  this.position = Vec(x,y);
  this.ownerId = false;
  this.tile = false;
  this.artString = "";
  this.health = new Gauge();
  this.movement = new Gauge();
  this.meleeD = 0;
  this.rangeD = 0;
  this.xp = 0;
  this.abilities = [];
  this.spellBook = false;
  //ranges
  this.moveRange = {};

  var drawPosition;

  this.draw = function(art, context, counter) {
    art.getArt(this.artString).draw(drawPosition,context);
  }

  this.move = function(pos, map) {
    var tile = map.getTile(pos.x, pos.y);
    if ( tile ) {
      this.position = tile.position.clone();
      this.tile = tile;
      tile.registerUnit(this);
      drawPosition = tile2Cart(this.position, tile.height);
      this.resetRanges(map);
    }
  }

  this.resetRanges = function(map) {
    this.moveRange = map.getTilesInRange(this.position, this.movement.current);
  }

}

function Wizard(x,y) {
  Unit.call(this,x,y);

  this.health.set(100);
  this.movement.set(5);
  this.artString = "wizard";

}


