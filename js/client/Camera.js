function Camera() {

  //pan
  var offset = Vec(0,0);
  offset.x = 400; offset.y = -400;
  var panSpeed = 10;
  //zoom
  var zoom = 0.9;
  var zoomSpeed = 0.1;
  var minZoom = 0.1;
  var maxZoom = 1;

  this.getOffset = function() {
    return offset;
  }

  this.getZoom = function() {
    return zoom;
  }

  this.update = function(controls) {
    var controlState = controls.getCameraState();
    var mousePos = controls.getMousePos();
    //pan update
    if (controlState.up)    { offset.y += panSpeed; }
    if (controlState.down)  { offset.y -= panSpeed; }
    if (controlState.left)  { offset.x += panSpeed; }
    if (controlState.right) { offset.x -= panSpeed; }
    //zoom update
    if (controlState.zoom > 0) {
      var dZoom = Math.min(zoomSpeed, maxZoom - zoom);
      zoom += dZoom;
    //  offset.y -= (config.canvasSize.y * dZoom);
    }else if (controlState.zoom < 0) {
      var dZoom = Math.min(zoomSpeed, zoom - minZoom);
      zoom -= dZoom;
     // offset.y += (config.canvasSize.y * dZoom);
    }
 //   offset.x = clamp(offset.x, 0, config.worldSize.x);
 //   offset.y = clamp(offset.y, 0, config.worldSize.y);
  }

}
