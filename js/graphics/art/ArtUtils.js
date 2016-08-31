//utility classes for art

function Colors() {
  this.blue = "rgb(0,0,250)";
  this.green = "rgb(50,200,50)";
  this.darkGreen = "rgb(25,100,25)";
  this.yellow = "rgb(200,200,50)";
  this.yellow1 = "rgb(123,200,10)";
  this.yellow2 = "rgb(200,255,150)";
}

function Shape() {
  //shape primitives -- all normalized, centered on 0,0 -- max width & height = 2
  this.geo = [];

  //mirrors a geo vertically.
  this.mirrorVert = function(geo) {
    var points = [];
    iterateArray(geo, function(point) {
      if(point.x != 0) {
        points.unshift(Vec(-point.x, point.y));
      }
    });
    return geo.concat(points);
  }

  this.rotate = function(theta) {
    iterateArray(this.geo, function(p) {
      p.rotate(theta);
    });
    return this;
  }

  this.scale = function(s) {
    iterateArray(this.geo, function(p) {
      p.scale(s);
    });
    return this;
  }

  this.pitch = function(pitch) {
    var pVal = Math.abs(Math.sin(pitch));
    iterateArray(this.geo, function(p) {
      p.x = pVal * p.x;
    });
    return this;
  }

  this.yaw = function(yaw) {
    var yVal = Math.abs(Math.sin(yaw));
    iterateArray(this.geo, function(p) {
 //     p.x = yVal * p.x;
    });
    return this;
  }


}

function Hexagon() {
  Shape.call(this);
  this.geo = this.mirrorVert([Vec(0,1),Vec(0,1).rotate(Math.PI/3),Vec(0,1).rotate(2*(Math.PI/3)),Vec(0,-1)]);
}

//isomorphic 2/5D shapes
//

function IsoShape(x,y,z,width,height) {

  this.x = x;
  this.y = y;
  this.z = z;

  this.originDistance = function(rot) {
    var pos = Vec(x,y).rotate(rot);
    var distance = pos.distance(Vec(-1,-1));
    return distance;
  }

  this.minZ = function() {
    return Math.min(z, z + height);
  }

  this.maxZ = function() {
    return Math.max(z, z + height);
  }

  this.overlaps = function(shape) {
    return (shape.minZ() <= this.maxZ() && shape.maxZ() >= this.minZ()) || (this.minZ() <= shape.maxZ() && this.maxZ() >= shape.minZ());
  }

  this.getOrigin = function(size,rot) {
    var origin = Vec(
      size.x - (config.tileSize / 2),
      size.y - (config.tileSize / 2)
    );
    var w = width * size.x;
    var pos = Vec(x,y).rotate(rot);
    return Vec(
      origin.x - (z * size.x) + (pos.x * size.x),
      origin.y - (z * size.y) + (pos.y * size.y)
    );
  }

  this.drawPanels = function(context,bPos,geoBot,hPos,geoTop,w,rot) {
    //draw panels
    var index1; var index2;
    var startIndex = Math.floor(rot / ((Math.PI*2) / geoBot.length)) % geoBot.length;
    startIndex = geoBot.length - startIndex;

    for(var i = startIndex; i < startIndex+geoBot.length; i++) {
      index1 = i % geoBot.length;
      index2 = (index1 + 1) % geoBot.length;
      drawPanel(context,bPos,geoBot,hPos,geoTop,w,index1,index2);
    }
  }

}

function CylindarIso(x,y,z,width,height,topScale,initRot,fill,stroke, test) {
  IsoShape.call(this,x,y,z,width,height);

  this.test = test || false;

  this.draw = function(context,size,rot) {
    //
    var w = width * size.x;
    var h = height * size.y;
    var hexBot = new Hexagon().rotate(initRot + rot).geo;
    var hexTop = new Hexagon().rotate(initRot + rot).scale(topScale).geo;
    var bPos = this.getOrigin(size,rot);
    var hPos = bPos.clone().add((Vec(-h,-h)));
    /*
    if (bPos.distance(size) < hPos.distance(size)) {
      var temp = bPos;
      bPos = hPos;
      hPos = temp;
      temp = hexBot;
      hexBot = hexTop;
      hexTop = temp;
    }
    */
    context.fillStyle = fill;
    context.strokeStyle = stroke;
    //draw bottom
    context.beginPath();
    drawGeo(hexBot, bPos, w, context);
    context.stroke();
    context.fill();
    //draw panels
    this.drawPanels(context,bPos,hexBot,hPos,hexTop,w,rot);
    //draw top
    context.beginPath();
    drawGeo(hexTop, hPos, w, context);
    context.stroke();
    context.fill();
  }

}

function drawGeo ( geo, origin, scale, context ) {
  var firstPoint = false;
  var pX; var pY;
  iterateArray(geo, function(point) {
    pX = origin.x + (point.x*(scale/2));
    pY = origin.y + (point.y*(scale/2));
    if(!firstPoint){
      context.moveTo(pX,pY);
      firstPoint = [pX,pY];
    }else{
      context.lineTo(pX,pY);
    }
  });
  context.lineTo(firstPoint[0],firstPoint[1]);
}

function drawPanel(context, bPos, geoBot, hPos, geoTop, scale, index1, index2) {
  var px; var py;
  //draw strokes
  context.beginPath();
  px = bPos.x + (geoBot[index1].x * (scale / 2));
  py = bPos.y + (geoBot[index1].y * (scale / 2));
  context.moveTo(px,py);
  px = hPos.x + (geoTop[index1].x * (scale / 2));
  py = hPos.y + (geoTop[index1].y * (scale / 2));
  context.lineTo(px,py);
  context.stroke();
  context.beginPath();
  px = bPos.x + (geoBot[index2].x * (scale / 2));
  py = bPos.y + (geoBot[index2].y * (scale / 2));
  context.moveTo(px,py);
  px = hPos.x + (geoTop[index2].x * (scale / 2));
  py = hPos.y + (geoTop[index2].y * (scale / 2));
  context.lineTo(px,py);
  context.stroke();
  //fill panel
  context.beginPath();
  px = bPos.x + (geoBot[index1].x * (scale / 2));
  py = bPos.y + (geoBot[index1].y * (scale / 2));
  context.moveTo(px,py);
  px = hPos.x + (geoTop[index1].x * (scale / 2));
  py = hPos.y + (geoTop[index1].y * (scale / 2));
  context.lineTo(px,py);
  px = hPos.x + (geoTop[index2].x * (scale / 2));
  py = hPos.y + (geoTop[index2].y * (scale / 2));
  context.lineTo(px,py);
  px = bPos.x + (geoBot[index2].x * (scale / 2));
  py = bPos.y + (geoBot[index2].y * (scale / 2));
  context.lineTo(px,py);
  px = bPos.x + (geoBot[index1].x * (scale / 2));
  py = bPos.y + (geoBot[index1].y * (scale / 2));
  context.lineTo(px,py);
  context.fill();
}


