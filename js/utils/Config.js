function Config() {

  this.fps = 60;

  this.canvasSize = Vec(1200,800);
  this.fullScreen = false;

  this.hexRatio = 0.86605;
  this.tileSize = 140;
  this.tileHeight = this.tileSize / 8;
  this.maxTileHeight = 10;
  this.tileGap = Vec(
      this.tileSize * this.hexRatio,
      this.tileSize * 0.75
  );

  this.maxPlayers = 6;

  this.mapTiles = Vec(120,120);
  this.worldEdge = Vec(
    this.maxTileHeight * this.tileGap.x,
    this.maxTileHeight * this.tileGap.y
  );
  this.worldSize = Vec(
    Math.ceil((this.mapTiles.x * this.tileGap.x) + (this.worldEdge.x * 2)),
    Math.ceil((this.mapTiles.y * this.tileGap.y) + (this.worldEdge.y * 2))
  );

  this.smallUnitSize = Vec(
    this.tileSize * 1.5,
    this.tileSize * 1.5
  );

  this.hillSeed = 20;


}
