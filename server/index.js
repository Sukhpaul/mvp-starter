//jshint esversion: 6
let express = require('express');
let bodyParser = require('body-parser');
let request = require('request');
let auth = require('../auth.js');
var $ = require("jquery");
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// let stats = require('../database-mysql');
let db = require('../database-mongo');

let app = express();

// UNCOMMENT FOR REACT
app.use(express.static(__dirname + '/../react-client/dist'));

//parse request data
app.use(bodyParser.json());

// UNCOMMENT FOR ANGULAR
// app.use(express.static(__dirname + '/../angular-client'));
// app.use(express.static(__dirname + '/../node_modules'));

app.get('/stats/:team', function (req, res) {
  db.findTeam(req.params.team)
    .then(team => {
    res.send(team);
  });
});

app.get('/player/:player', function (req, res) {
  db.findPlayer(req.params.player)
    .then(player => {
    res.send(player);
  });
});


//recieve data and add to db
app.post('/stats', (req, err) => {
  req.body.forEach(player => { 
    db.save(player);
  });
  console.log('Players have been saved');
});


app.listen(3000, function() {
  console.log('listening on port 3000!');
});

