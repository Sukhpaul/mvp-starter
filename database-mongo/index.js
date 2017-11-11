//jshint esversion: 6
let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

let db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

let statsSchema = mongoose.Schema({
  Team: String,
  Wins: Number,
  Loses: Number,
  Ties: Number,
  Overall_Standings: Number
});

let Stats = mongoose.model('Stats', statsSchema);

let selectAll = function(callback) {
  Stats.find({}, function(err, statss) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, statss);
    }
  });
};

//save data from API response
let save = (data) => {
  let newData = {
    Team: data.overallteamstandings.teamstandingsentry[0].team.City + data.overallteamstandings.teamstandingsentry[0].team.Name,
    Wins: data.overallteamstandings.teamstandingsentry[2].Wins['#text'],
    Loses: data.overallteamstandings.teamstandingsentry[2].Losses['#text'],
    Ties: data.overallteamstandings.teamstandingsentry[2].Ties['#text'],
    Overall_Standings: data.overallteamstandings.teamstandingsentry[1]
  };

  let teamStats = new Stats(newData);

  teamStats.save()
           .then(() => {
            console.log('Team stats were saved');
           })
           .catch(() => {
            console.log('Team stats were not saved');
           });

};











module.exports.selectAll = selectAll;
module.exports.save = save;