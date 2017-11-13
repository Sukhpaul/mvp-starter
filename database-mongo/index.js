//jshint esversion: 6
let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/players');
mongoose.Promise = global.Promise;

let db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

let playersSchema = mongoose.Schema({
  Team: String,
  Name: String,
  Position: String,
  Ppg: Number,
  Ast: Number,
  Rebs: Number
});

let Players = mongoose.model('Players', playersSchema);

// let selectAll = function(callback) {
//   Players.find({}, function(err, players) {
//     if(err) {
//       callback(err, null);
//     } else {
//       callback(null, players);r
//     }
//   });
// };

let findTeam = (team) => {
  console.log('Finding Team');
  return Players.find({"Team": team})
      .then((team) => {
        console.log('Team found');
        return team;
      })
      .catch(() => {
        console.log('players not found');
      });
};

let findPlayer = (player) => {
  console.log('Finding Player');
  return Players.find({"Name": player})
      .then((player) => {
        console.log('Player found');
        return player;
      })
      .catch(() => {
        console.log('players not found');
      });
};

//save data from API response
let save = (player) => {
  let newPlayer = {
    Team: player.team,
    Name: player.name,
    Position: player.Position,
    Ppg: player.Ppg,
    Ast: player.Ast,
    Rebs: player.Rebs
  };

  let playerStats = new Players(newPlayer);

  playerStats.save()
           .then(() => {
            console.log('Player stats were saved');
           })
           .catch(() => {
            console.log('Player stats were not saved');
           });

};











module.exports.findTeam = findTeam;
module.exports.save = save;
module.exports.findPlayer = findPlayer;