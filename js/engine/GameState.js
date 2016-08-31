function GameState() {
  this.loaded = false;
  this.map;
  this.units = [];

  this.players = [];
  this.currentPlayer = 0;

  this.init = function() {
    this.map = new MapMaker().createWorld();
    this.addUnit(new Wizard(20,20));
    this.loaded = true;
  }

  this.addUnit = function(unit) {
    unit.move(unit.position,this.map);
    this.units.push(unit);
  }

}
