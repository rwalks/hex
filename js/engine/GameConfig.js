function GameConfig () {

  this.hotseatGame = false;

  this.mapSize = 'Small';
  this.computerCount = 0;
  this.humanCount = 1;
  this.difficulty = 'Scrub';

  this.teamGame = false;
  this.permanentTeams = false;

  this.humans = [];
  this.computers = [];

  this.setHumans = function(humanCount) {
    this.humanCount = humanCount;
    for ( var h = 0; h < this.humanCount; h++ ) {
      this.humans.push({ id: h+1, culture: "Magi", hero: "Warlock", team: h + 1 });
    }
  }

  this.setComputers = function(computerCount) {
    this.computerCount = computerCount;
    for ( var c = 0; c < this.computerCount; c++ ) {
      this.computers.push({ id: this.humanCount + c + 1, culture: "", hero: "", team: this.humanCount + c + 1 });
    }
  }

}
