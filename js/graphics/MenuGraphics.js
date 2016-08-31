function MenuGraphics() {

  var spheres = [];
  for ( var y = 0; y <= 1; y++ ) {
    for ( var i = 0; i < 15; i++ ) {
      var sy = (y > 0) ? 1 : 0;
      var dy = sy ? 0.5 : 0.1;
      spheres.push(new MenuMote(false, sy, dy + (i * 0.026), sy));
    }
  }

  this.drawMenu = function(context) {
    context.beginPath();
    context.rect(0,0,config.canvasSize.x,config.canvasSize.y);
    context.fillStyle = "rgb(0,0,0)";
    context.fill();
    drawSpheres(context);
  }

  this.drawIntro = function(context, art) {
    context.beginPath();
    context.rect(0,0,config.canvasSize.x,config.canvasSize.y);
    context.fillStyle = "rgb(0,0,0)";
    context.fill();
    drawSpheres(context);
  }

  this.drawHero = function(context, heroArt) {
    context.save();
    var zoom = 0.8;
    context.setTransform(zoom,zoom/2,-zoom,zoom/2,0,0);
    heroArt.draw(Vec(790/zoom,190/zoom), context);
    context.restore();
  }

  function drawSpheres(context) {
    iterateArray(spheres, function(s) {
      s.draw(context);
    });
  }

}

function MenuMote(rand, x , y, opp) {
  var position;
  if ( rand ) {
    position = Vec(
      config.canvasSize.x * Math.random(),
      config.canvasSize.y * Math.random()
    );
  } else {
    position = Vec(
      config.canvasSize.x * x,
      config.canvasSize.y * y
    );
  }

  var trail = [];
  var r = Math.round(Math.random() * 255);
  var g = Math.round(Math.random() * 255);
  var b = Math.round(Math.random() * 255);

  var maxV = 5;
  var maxSize = 4;
  var size = Math.random() * maxSize;
  var dSize = (size >= (maxSize * 0.5)) ? -0.1 : 0.1;

  var velocity;
  resetVelocity();

  var tailAlpha = 1.0;

  this.draw = function(context) {
    checkBounds();
    context.fillStyle = fillColor(1);
    context.lineWidth = 6;
    for ( var i = 0; i < trail.length; i++) {
      var p2 = (i == trail.length - 1) ? position : trail[i+1];
      context.strokeStyle = (i == 0) ? fillColor(tailAlpha) : fillColor(0.6);
      context.beginPath();
      context.moveTo(trail[i].x, trail[i].y);
      context.lineTo(p2.x, p2.y);
      context.stroke();
    }
    context.beginPath();
    context.arc(position.x,position.y,size,0,Math.PI * 2);
    context.fill();
    if ( trail.length > 3 ) {
      tailAlpha -= 0.01;
      if (tailAlpha <= 0) {
        trail.shift();
        tailAlpha = 1;
      }
    }
  }

  function resetVelocity() {
    trail.push(position.clone());
    if (rand) {
      velocity = Vec(maxV * Math.random(),0);
      velocity.y = maxV - velocity.x;
      velocity.x = Math.random() > 0.5 ? velocity.x * -1 : velocity.x;
      velocity.y = Math.random() > 0.5 ? velocity.y * -1 : velocity.y;
    } else {
      velocity = opp ?
        Vec(maxV * 1,maxV * 0) :
        Vec(maxV * -1,maxV * 0);
    }
  }

  function checkBounds() {
    if (Math.random() > 0.999) {
      rand = true;
      resetVelocity();
    }
    position.add(velocity);
    if ( position.x < 0 || position.x > config.canvasSize.x) {
      velocity.x = -velocity.x;
      trail.push(position.clone());
    }
    if ( position.y < 0 || position.y > config.canvasSize.y) {
      velocity.y = -velocity.y;
      trail.push(position.clone());
    }
    size += dSize;
    if ( size < 0 || size > maxSize) {
      dSize = -dSize;
      if ( size < 0 ) {
        size = 0;
      }
    }
  }

  function fillColor(alpha) {
//    r += (Math.random() > 0.5) ? 5 : -5;
//    r = clamp(r, 0, 255);
//    g += (Math.random() > 0.5) ? 5 : -5;
//    g = clamp(g, 0, 255);
//    b += (Math.random() > 0.5) ? 5 : -5;
//    b = clamp(b, 0, 255);

    r = Math.random() > 0.999 ? 255 : 0;//Math.floor(Math.random() * 255);
    g = Math.random() > 0.999 ? 255 : 0;//Math.floor(Math.random() * 255);
    b = Math.floor(120 + (Math.random() * 130));
    a = Math.random() > 0.5 ? 0.1 : alpha;
    return "rgba("+r+","+g+","+b+","+alpha+")";
  }

}
