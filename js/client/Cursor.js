function Cursor(artString) {

  var position = Vec(0,0);
  var validDraw = false;

  this.update = function(mapTile) {
    if ( mapTile ) {
      var height = mapTile.height;
      position.x = ((mapTile.position.x + 1) * config.tileGap.x) + config.worldEdge.x;
      position.y = ((mapTile.position.y + 1) * config.tileGap.y) + config.worldEdge.y;

      if ( mapTile.position.y % 2 != 0 ) {
        position.x += (config.tileGap.x / 2);
      }

      position.x -= height * config.tileHeight;
      position.y -= height * config.tileHeight;
      validDraw = true;
    } else {
      validDraw = false;
    }
  }

  this.draw = function(context, art) {
    if ( validDraw ) {
      art.getArt(artString).draw(position, context);
    }
  }
}

function HoverCursor() {
  Cursor.call(this, "hoverCursor");
}

function TargetCursor() {
  Cursor.call(this, "targetCursor");
}
