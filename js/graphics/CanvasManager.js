function CanvasManager( mainCanvas ) {
  var This = this;

  var canvasLayers = {};
  var buffers = ["mapBuffer"];

  this.init = function() {
    //create canvas layers
    canvasLayers.main = new CanvasLayer(mainCanvas, config.canvasSize);
    canvasLayers.mapBuffer = new CanvasLayer(false, config.worldSize);
    //resize handler
	  window.addEventListener( 'resize', updateSize, false );
    //set initial canvas sizes
    updateSize();
  }

  this.getContext = function(layer) {
    return canvasLayers[layer].context;
  }

  this.getCanvas = function(layer) {
    return canvasLayers[layer].canvas;
  }

  this.clearBuffers = function() {
    iterateArray( buffers, function(layer) {
      this.clearContext(layer);
    });
  }

  this.clearContext = function(layer) {
    var layer = canvasLayers[layer];
    layer.context.clearRect(0, 0, layer.canvas.width, layer.canvas.height);
  }

  function clearMain() {
    var layer = canvasLayers.main;
    layer.context.beginPath();
    layer.context.rect(0,0,layer.canvas.width,layer.canvas.height);
    layer.context.fillStyle = "rgb(100,100,100)";
    layer.context.fill();
  }

  function updateSize() {
    //main
    canvasLayers.main.canvas.width = config.canvasSize.x;
    canvasLayers.main.canvas.height = config.canvasSize.y;
  }

  function getWindowSize() {
    return new Vector(window.innerWidth, window.innerHeight);
  }

  //holder class for canvas layer
  function CanvasLayer(canvas, size) {
    this.canvas = canvas || document.createElement('canvas');
    if(size) {
      this.canvas.width = size.x;
      this.canvas.height = size.y;
    }
    //create context
    this.context = this.canvas.getContext('2d');
  }

}
