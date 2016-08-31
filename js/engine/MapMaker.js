function MapMaker() {

  this.createWorld = function() {
    var map = [];
    for(var y = 0; y < config.mapTiles.y; y++) {
      map.push([]);
      for(var x = 0; x < config.mapTiles.x; x++) {
        map[y].push(new MapTile(x,y,1,'grass'));
      }
    }
    addHills(map);
    setTypes(map);
    return new Map(map);
  }

  function setTypes(map) {
    var adjacent;
    var tile;
    for(var y = 0; y < config.mapTiles.y; y++) {
      for(var x = 0; x < config.mapTiles.x; x++) {
        tile = map[y][x];
        var waterNext = 0;
        adjacent = getAdjacent(tile,map);
        iterateArray(adjacent, function(t) {
          if (t.height == 1) {
            waterNext += 1;
          }
        });
        if (tile.height == 1) {
          tile.type = (waterNext == adjacent.length) ? 'deep' : 'water';
        } else if (tile.height == 2) {
          tile.type = (waterNext > 0) ? 'beach' : 'grass';
        } else if (tile.height == config.maxTileHeight) {
          tile.type = 'mountain';
        }
        tile.updateArt();
      }
    }
  }

  function addHills(map) {
    var x; var y;
    for (var r = 0; r < config.hillSeed; r++) {
      x = Math.floor(Math.random() * config.mapTiles.x);
      y = Math.floor(Math.random() * config.mapTiles.y);
      var tile = map[y][x];
      if (tile) {
        tile.height = config.maxTileHeight;
        tile.updateArt();
        spreadHeight(tile, map);
      }
    }
  }

  function spreadHeight(tile, map) {
    if (tile.height > 1) {
      iterateArray(getAdjacent(tile,map), function(t) {
        if ( tile.height > t.height ) {
          if ( Math.random() > 0.9 ) {
            t.height = tile.height;
          } else {
            t.height = tile.height - 1;
          }
          t.updateArt();
          spreadHeight(t, map);
        }
      });
    }
  }

  function getAdjacent(tile, map) {
    var coords = [];
    var pos = tile.position;
    if ( tile.y % 2 == 0) {
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
    //
    var hexes = [];
    var tile;
    iterateArray(coords, function(offset) {
      tile = (map[offset.y] && map[offset.y][offset.x]) ? map[offset.y][offset.x] : false;
      if ( tile ) {
        hexes.push(tile);
      }
    });
    return hexes;
  }

}

