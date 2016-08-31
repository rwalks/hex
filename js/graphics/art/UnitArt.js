function UnitArt() {

  this.load = function(staticArt) {
    staticArt['wizard'] = new WizardArt();
    staticArt['goblinPrince'] = new GoblinPrinceArt();
    staticArt['cyclops'] = new CyclopsArt();
    staticArt['horseLord'] = new HorseLordArt();
  }

  function UnitArt() {
    CachedArt.call(this);
    var This = this;

    this.shapes = [];

    var theta = 0;
    this.draw = function(pos,canvasContext){
      this.clearContext();
      this.drawCanvas(theta);
      theta += (Math.PI / 150);
      var dx = pos.x - (this.size.x - config.tileSize);
      var dy = pos.y - (this.size.y - config.tileSize);
      canvasContext.save();
      canvasContext.translate(dx,dy);
      canvasContext.drawImage(this.canvas,0,0);
      canvasContext.restore();
    }

    this.drawCanvas = function(rot) {
      this.drawShapes(rot || 0);
    }

    this.drawShapes = function(rot) {
      iterateArray(this.orderShapes(rot), function(shape) {
        shape.draw(This.context, This.size, rot);
      });
    }

    this.orderShapes = function(rot) {
      return this.shapes.sort(function(s1,s2) {
        if ( s1.overlaps(s2) ) {
          var d1 = s1.originDistance(rot);
          var d2 = s2.originDistance(rot);
          if ( d1 != d2 ) {
            return d1 - d2;
          } else {
            return s1.z - s2.z;
          }
        } else {
          return s1.z - s2.z;
        }
      });
    }
  }

/**************************
 * MAGI ART
 * ***********************/
  function  WizardArt() {
    UnitArt.call(this);

    this.size = config.smallUnitSize.clone();

    this.shapes = [
      //robes
      new CylindarIso(0.0, 0.0, 0.0, 0.15, 0.05, 0.8, 0, "rgb(0,100,200)","rgb(0,150,250)"),
      new CylindarIso(0.0, 0.0, 0.05, 0.12, 0.15, 0.9, 0, "rgb(0,100,200)","rgb(0,150,250)"),
      new CylindarIso(0.0, 0.0, 0.2, 0.12*0.9, 0.05, 0.6, 0, "rgb(0,100,200)","rgb(0,150,250)"),
      //head
      new CylindarIso(0.0, 0.0, 0.25, 0.12, 0.1, 1.0, 0, "rgb(228,185,142)","rgb(255,220,177)"),
      //hat
      new CylindarIso(0.0, 0.0, 0.35, 0.18, 0.1, 0.5, 0, "rgb(0,100,200)","rgb(0,150,250)"),
      new CylindarIso(0.0, 0.0, 0.45, 0.09, 0.2, 0.0, 0, "rgb(0,100,200)","rgb(0,150,250)"),
      //beard
      new CylindarIso(0.06, 0.0, 0.24, 0.05, 0.06, 0.3, 0, "rgb(220,220,220)","rgb(255,255,255)"),
      new CylindarIso(0.06, 0.0, 0.1, 0.005, 0.15, 10.0, 0, "rgb(220,220,220)","rgb(255,255,255)"),
      //staff
      new CylindarIso(0.05, 0.1, 0.2, 0.03, -0.2, 0.95, 0, "rgb(100,100,100)","rgb(200,200,200)"),
      new CylindarIso(0.05, 0.1, 0.2, 0.03, 0.2, 0.95, 0, "rgb(100,100,100)","rgb(200,200,200)"),
      new CylindarIso(0.05, 0.1, 0.4, 0.05, 0.05, 1, 0, "rgb(255,0,0)","rgb(255,200,200)"),
      new CylindarIso(0.05, 0.1, 0.45, 0.06, 0.05, 0, 0, "rgb(100,100,100)","rgb(200,200,200)"),
    ];
  }

  function  GoblinPrinceArt() {
    UnitArt.call(this);

    this.size = config.smallUnitSize.clone();

    this.shapes = [
      //feet
      new CylindarIso(-0.03, 0.0, 0.0, 0.05, 0.02, 0.8, 0, "rgb(40,200,50)","rgb(40,250,50)"),
      new CylindarIso(0.03, 0.0, 0.0, 0.05, 0.02, 0.8, 0, "rgb(40,200,50)","rgb(40,250,50)"),
      //legs
      new CylindarIso(-0.03, 0.0, 0.0, 0.03, 0.09, 0.7, 0, "rgb(40,200,50)","rgb(40,250,50)"),
      new CylindarIso(0.03, 0.0, 0.0, 0.03, 0.09, 0.7, 0, "rgb(40,200,50)","rgb(40,250,50)"),
      //body
      new CylindarIso(0.0, 0.0, 0.1, 0.1, 0.12, 0.7, 0, "rgb(80,40,40)","rgb(120,100,100)"),
      //arms
      new CylindarIso(0.08, 0.04, 0.14, 0.05, 0.01, 0.3, 0, "rgb(40,200,50)","rgb(40,250,50)"),
      new CylindarIso(-0.08, 0.04, 0.14, 0.05, 0.01, 0.3, 0, "rgb(40,200,50)","rgb(40,250,50)"),
      //dagger
      new CylindarIso(-0.08, 0.04, 0.15, 0.05, 0.01, 0, 0, "rgb(40,20,20)","rgb(40,20,20)"),
      new CylindarIso(-0.08, 0.04, 0.16, 0.03, 0.2, 0, 0, "rgb(100,100,100)","rgb(150,150,150)"),
      //neck
      new CylindarIso(0.0, 0.0, 0.22, 0.05, 0.05, 1, 0, "rgb(40,200,50)","rgb(40,250,50)"),
      //head
      new CylindarIso(0.0, 0.0, 0.27, 0.1, 0.075, 0.8, 0, "rgb(40,200,50)","rgb(40,250,50)"),
      //nose
      new CylindarIso(0.0, 0.03, 0.29, 0.05, 0.055, 0.2, 0, "rgb(40,200,50)","rgb(40,250,50)"),
      //eyes
      new CylindarIso(0.02, 0.03, 0.3, 0.01, 0.03, 1, 0, "rgb(0,0,0)","rgb(40,40,40)"),
      new CylindarIso(-0.02, 0.03, 0.3, 0.01, 0.03, 1, 0, "rgb(0,0,0)","rgb(40,40,40)"),
      //crown
      new CylindarIso(0.0, 0.0, 0.345, 0.1, 0.03, 1, 0, "rgb(200,200,50)","rgb(250,250,50)"),
      //crown spikes
      new CylindarIso(0.04, 0.0, 0.37, 0.01, 0.03, 0.1, 0, "rgb(200,200,50)","rgb(250,250,50)"),
      new CylindarIso(-0.04, 0.0, 0.37, 0.01, 0.03, 0.1, 0, "rgb(200,200,50)","rgb(250,250,50)"),
      new CylindarIso(0.0, 0.04, 0.37, 0.01, 0.03, 0.1, 0, "rgb(200,200,50)","rgb(250,250,50)"),
      new CylindarIso(0.0, -0.04, 0.37, 0.01, 0.03, 0.1, 0, "rgb(200,200,50)","rgb(250,250,50)"),

    ];
  }

  function CyclopsArt() {
    UnitArt.call(this);

    this.size = config.smallUnitSize.clone();

    this.shapes = [
      //feet
      new CylindarIso(-0.07, 0.0, 0.0, 0.13, 0.03, 0.8, 0, colors.yellow1,colors.yellow2),
      new CylindarIso(0.07, 0.0, 0.0, 0.13, 0.03, 0.8, 0, colors.yellow1,colors.yellow2),
      //legs
      new CylindarIso(-0.07, 0.0, 0.03, 0.1, 0.12, 0.7, 0, colors.yellow1,colors.yellow2),
      new CylindarIso(0.07, 0.0, 0.03, 0.1, 0.12, 0.7, 0, colors.yellow1,colors.yellow2),
      //body
      new CylindarIso(0.0, 0.0, 0.15, 0.18, 0.2, 1.2, 0, colors.yellow1,colors.yellow2),
      //arms
      new CylindarIso(0.14, 0.0, 0.16, 0.1, 0.2, 0.4, 0, colors.yellow1,colors.yellow2),
      new CylindarIso(-0.14, 0.0, 0.16, 0.1, 0.2, 0.4, 0, colors.yellow1,colors.yellow2),
      //neck
      new CylindarIso(0.0, 0.0, 0.35, 0.06, 0.03, 0.5, 0, colors.yellow1,colors.yellow2),
      //head
      new CylindarIso(0.0, 0.0, 0.38, 0.15, 0.1, 0.8, 0, colors.yellow1,colors.yellow2),
      //eye
      new CylindarIso(0.0, 0.05, 0.42, 0.05, 0.05, 1, 0, "rgb(250,255,250)","rgb(250,255,250"),
      //pupil
      new CylindarIso(0.0, 0.07, 0.44, 0.02, 0.02, 1, 0, "rgb(0,50,0)","rgb(0,100,0"),
      //head2
      new CylindarIso(0.0, 0.0, 0.48, 0.12, 0.05, 0.5, 0, colors.yellow1,colors.yellow2),
      //horn
      new CylindarIso(0.0, 0.03, 0.53, 0.04, 0.1, 0.0, 0, "rgb(100,100,100)","rgb(170,255,140"),
    ];
  }

/**************************
 * NOMAD ART
 * ***********************/

  function HorseLordArt() {
    UnitArt.call(this);

    this.size = config.smallUnitSize.clone();

    this.shapes = [
      //feet
      new CylindarIso(-0.07, 0.0, 0.0, 0.13, 0.03, 0.8, 0, colors.yellow1,colors.yellow2),
      new CylindarIso(0.07, 0.0, 0.0, 0.13, 0.03, 0.8, 0, colors.yellow1,colors.yellow2),
      //legs
      new CylindarIso(-0.07, 0.0, 0.03, 0.1, 0.12, 0.7, 0, colors.yellow1,colors.yellow2),
      new CylindarIso(0.07, 0.0, 0.03, 0.1, 0.12, 0.7, 0, colors.yellow1,colors.yellow2),
      //body
      new CylindarIso(0.0, 0.0, 0.15, 0.18, 0.2, 1.2, 0, colors.yellow1,colors.yellow2),
      //arms
      new CylindarIso(0.14, 0.0, 0.16, 0.1, 0.2, 0.4, 0, colors.yellow1,colors.yellow2),
      new CylindarIso(-0.14, 0.0, 0.16, 0.1, 0.2, 0.4, 0, colors.yellow1,colors.yellow2),
      //neck
      new CylindarIso(0.0, 0.0, 0.35, 0.06, 0.03, 0.5, 0, colors.yellow1,colors.yellow2),
      //head
      new CylindarIso(0.0, 0.0, 0.38, 0.15, 0.1, 0.8, 0, colors.yellow1,colors.yellow2),
      //eye
      new CylindarIso(0.0, 0.05, 0.42, 0.05, 0.05, 1, 0, "rgb(250,255,250)","rgb(250,255,250"),
      //pupil
      new CylindarIso(0.0, 0.07, 0.44, 0.02, 0.02, 1, 0, "rgb(0,50,0)","rgb(0,100,0"),
      //head2
      new CylindarIso(0.0, 0.0, 0.48, 0.12, 0.05, 0.5, 0, colors.yellow1,colors.yellow2),
      //horn
      new CylindarIso(0.0, 0.03, 0.53, 0.04, 0.1, 0.0, 0, "rgb(100,100,100)","rgb(170,255,140"),
    ];
  }


}
