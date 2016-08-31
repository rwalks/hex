function Controls( canvas ) {
  var This = this;

	var keys = { A: 65, W: 87, D: 68, S: 83, SPACE: 32, SHIFT: 16 ,CTRL: 17, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40 };

  var controlMap = { 37: 'left', 38: 'up', 39: 'right', 40: 'down' };

  var cameraControlState;
  var mouseState;

  this.init = function() {
		window.addEventListener( 'keydown', keyDown, false );
		window.addEventListener( 'keyup', keyUp, false );
		window.addEventListener( 'click', leftClick, false );
		window.addEventListener( 'contextmenu', rightClick, false );
		window.addEventListener( 'mousemove', mouseMove, false );
		window.addEventListener( 'mousewheel', mouseZoom, false );
    this.reset();
  }

  this.update = function() {
    mouseState.leftClick = false;
    mouseState.rightclick = false;
    if (cameraControlState.zoom > 0) { cameraControlState.zoom -= 1; }
    if (cameraControlState.zoom < 0) { cameraControlState.zoom += 1; }
  }

  this.getCameraState = function() {
    return cameraControlState;
  }

  this.getMouseState = function() {
    return mouseState;
  }

  this.getMousePos = function() {
    return mouseState.position;
  }

  this.anyInteraction = function() {
    return mouseState.leftClick || mouseState.rightClick;
  }

  this.reset = function() {
    cameraControlState = { up: false, down: false, left: false, right: false, zoom: 0 };
    mouseState = { leftClick: false, rightClick: false, position: Vec(0,0) };
  }

	function keyDown( ev ) {
		keyPress(ev.keyCode, true);
	}

	function keyUp( ev ) {
		keyPress(ev.keyCode, false);
	}

  function keyPress( key, keyDown ) {
    if (key in controlMap) {
      var controlKey = controlMap[key];
      if (controlKey in cameraControlState) {
        cameraControlState[controlKey] = keyDown;
      }
    }
  }

  function leftClick( ev ) {
    mouseState.leftClick = true;
  }

  function rightClick( ev ) {
    mouseState.rightClick = true;
  }

  function mouseZoom( ev ) {
    cameraControlState.zoom += (ev.wheelDelta && ev.wheelDelta < 0) ? -1 : 1;
  }

  function mouseMove( ev ) {
    setMousePosition(ev);
  }

  function mousePosition( evt ) {
    var rect = canvas.getBoundingClientRect();
    return new Vector(
      evt.clientX - rect.left,
      evt.clientY - rect.top
    );
  }

  function setMousePosition( evt ) {
    var rect = canvas.getBoundingClientRect();
    mouseState.position.x = evt.clientX - rect.left;
    mouseState.position.y = evt.clientY - rect.top;
  }

}
