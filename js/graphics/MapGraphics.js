function MapGraphics() {

  this.drawMap = function(art, gameState, mapContext) {
    var map = gameState.map.getTiles();
    var dPos = config.worldEdge.clone();
    var row; var tile;
    for(var y = 0; y < map.length; y++) {
      dPos.y += config.tileGap.y;
      //stagger y height for tiling
      dPos.x = config.worldEdge.x + ((y % 2 == 0) ? 0 : config.tileGap.x * 0.5) ;
      row = map[y];
      for(var x = 0; x < row.length; x++) {
        dPos.x += config.tileGap.x;
        tile = row[x];
        if(tile){
          art.getArt(tile.artString).draw(dPos,mapContext);
        }
      }
    }
  }

}
