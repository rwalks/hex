function Gui() {

  var hoverCursor = new HoverCursor();
  var targetCursor = new TargetCursor();
  var hoverTile = false;
  var targetTile = false;

  this.update = function(gameState, controls, camera) {
    var offset = camera.getOffset();
    var zoom = camera.getZoom();
    var mouseState = controls.getMouseState();
    var mousePos = mouseState.position;
    hoverTile = cart2Tile(gameState.map, mousePos, offset, zoom);
    hoverCursor.update(hoverTile);
    if ( mouseState.leftClick && hoverTile ) {
      targetTile = hoverTile;
      targetCursor.update(targetTile);
    }
  }

  this.drawCursors = function(context,art) {
    hoverCursor.draw(context, art);
    targetCursor.draw(context, art);
  }

  this.drawRange = function(map, context, art) {
    if ( targetTile && targetTile.unit ) {
      var tiles = targetTile.unit.moveRange;
      var xKeys = Object.keys(tiles);
      for(var x = 0; x < xKeys.length; x++) {
        var yKeys = Object.keys(tiles[xKeys[x]]);
        for(var y = 0; y < yKeys.length; y++) {
          var t = map.getTile(xKeys[x],yKeys[y]);
          targetCursor.update(t);
          targetCursor.draw(context,art);
        }
      }
    }
  }

}
