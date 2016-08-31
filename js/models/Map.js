function Map(tileMap) {
  var This = this;
  var tiles = tileMap;

  this.getTile = function(x,y) {
    return (tiles[y] && tiles[y][x]) ? tiles[y][x] : false;
  }

  this.getTiles = function() {
    return tiles;
  }

  this.getTilesInRange = function(pos, dist) {
    var tiles = {};
    var tile; var tx; var ty; var d;
    for(var y = -dist; y < dist; y++) {
      d = (dist * 2) + 1 - Math.abs(y);
      for(var x = 0; x < d; x++) {
        ty = pos.y + y;
        tx = (pos.x - dist) + Math.abs(y) + x + ((ty % 2 == 0) ? 0 : -1 );
        var tile = this.getTile(tx,ty);
        if (tile) {
          if (!tiles[tile.position.x]) {
            tiles[tile.position.x] = {};
          }
          tiles[tile.position.x][tile.position.y] = tile;
        }
      }
    }
    return tiles;
  }

  function validNeighbors(tile, tiles, d) {
    if (!tile) {
      //pass if no tile
    } else {
      var seenBefore = false;
      if (!tiles[tile.position.x]) {
        tiles[tile.position.x] = {};
      } else {
        var prevTile = tiles[tile.position.x][tile.position.y];
        if ( prevTile && (prevTile[1] >= d)) {
          seenBefore = true;
        }
      }
      tiles[tile.position.x][tile.position.y] = [tile,d];
      if ( !seenBefore && d > 0) {
        iterateArray(getNeighbors(tile),function(t) {
          validNeighbors(This.getTile(t.x,t.y),tiles,d-1);
        });
      }
    }
  }

  function getNeighbors(tile) {
    var coords = [];
    var pos = tile.position;
    if ( pos.y % 2 == 0) {
      //longer row
      coords.push(Vec(pos.x-1,pos.y-1));
      coords.push(Vec(pos.x-1,pos.y+1));
    } else {
      //indented row
      coords.push(Vec(pos.x+1,pos.y-1));
      coords.push(Vec(pos.x+1,pos.y+1));
    }
    //both
    coords.push(Vec(pos.x-1,pos.y));
    coords.push(Vec(pos.x+1,pos.y));
    coords.push(Vec(pos.x,pos.y-1));
    coords.push(Vec(pos.x,pos.y+1));
    return coords;
  }

}

function MapTile(x, y, height, type) {
  this.type = type;
  this.position = Vec(x, y);
  this.height = height;
  this.artString = '';

  this.unit = false;

  this.updateArt = function() {
    this.artString = this.type[0] + this.height;
  }

  this.registerUnit = function(unit) {
    this.unit = unit;
    return this;
  }

  this.deregisterUnit = function(unit) {
    this.unit = false;
    return this;
  }
}
