//utility classes and functions

function Vector( x, y ) {
  this.x = x;
  this.y = y;

  this.clone = function(){
    return new Vector(this.x,this.y);
  }

  this.rotate = function(theta) {
    var x = (this.x*Math.cos(theta))-(this.y*Math.sin(theta));
    var y = (this.x*Math.sin(theta))+(this.y*Math.cos(theta));
    this.x = x;
    this.y = y;
    return this;
  }

  this.distance = function(p) {
    return Math.sqrt(Math.pow((p.x - this.x),2)+Math.pow((p.y-this.y),2));
  }

  this.scale = function(s) {
    this.x = this.x * s;
    this.y = this.y * s;
    return this;
  }

  this.add = function(v) {
    this.x += v.x;
    this.y += v.y;
    return this;
  }

  this.multiply = function(v) {
    this.x = this.x * v.x;
    this.y = this.y * v.y;
    return this;
  }

}

function distance3(v1,v2) {
  return Math.sqrt(Math.pow((v2[0] - v1[0]),2)+Math.pow((v2[1]-v1[1]),2)+Math.pow((v2[2]-v1[2]),2));
}

function Vec( x, y ) {
  return new Vector(x,y);
}

function iterateHashVals( hash, func) {
  var keys = Object.keys(hash);
  for(var i=0; i < keys.length; i++) {
    func(hash[keys[i]]);
  }
}

function iterateArray( array, func) {
  for(var i=0; i < array.length; i++) {
    func(array[i]);
  }
}

function clamp( val, min, max ) {
  return Math.min(Math.max(val, min), max);
}

function getIso(point) {
  var ix = point.x - point.y;
  var iy = (point.x + point.y) / 2;
  return Vec(ix,iy);
}

function Gauge(max, current) {
  this.max = max || 0;
  this.current = current || this.max;

  this.set = function(max) {
    this.max = max;
    this.current = max;
  }
}

function tile2Cart(pos, height) {
  var cartPos = Vec(
    ((pos.x + 1) * config.tileGap.x) + config.worldEdge.x,
    ((pos.y + 1) * config.tileGap.y) + config.worldEdge.y
  );

  if ( pos.y % 2 != 0 ) {
    cartPos.x += (config.tileGap.x / 2);
  }

  cartPos.x -= height * config.tileHeight;
  cartPos.y -= height * config.tileHeight;
  return cartPos;
}

function cart2Tile(map, mousePos, offset, zoom) {
  var mPos = mousePos.clone();

  mPos.x -= offset.x;
  mPos.y -= offset.y;
  mPos.x = mPos.x / zoom;
  mPos.y = mPos.y / zoom;
  var px = (2 * mPos.y + mPos.x) / 2;
  var py = (2 * mPos.y - mPos.x) / 2;

  px -= config.worldEdge.x;
  py -= config.worldEdge.y;

  var ty = Math.floor(py / config.tileGap.y) - 1;
  if (ty % 2 != 0) {
    px -= config.tileGap.x / 2;
  }
  var tx = Math.floor(px / config.tileGap.x) - 1;

  var tile = map.getTile(tx,ty);
  if(tile) {
    var height = tile.height;

    if ( height > 1 ) {
      if (ty % 2 != 0) {
        px += config.tileGap.x / 2;
      }
      px += ((height-1) * config.tileHeight);
      py += ((height-1) * config.tileHeight);
      ty = Math.floor(py / config.tileGap.y) - 1;
      if (ty % 2 != 0) {
        px -= config.tileGap.x / 2;
      }
      tx = Math.floor(px / config.tileGap.x) - 1;
    }
    return(map.getTile(tx,ty));
  }
  return false;
}
