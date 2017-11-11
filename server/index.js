//jshint esversion: 6
let express = require('express');
let bodyParser = require('body-parser');
let request = require('request');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// let stats = require('../database-mysql');
let db = require('../database-mongo');

let app = express();

// UNCOMMENT FOR REACT
app.use(express.static(__dirname + '/../react-client/dist'));

app.use(bodyParser.json());

// UNCOMMENT FOR ANGULAR
// app.use(express.static(__dirname + '/../angular-client'));
// app.use(express.static(__dirname + '/../node_modules'));

//get stats from API
let statsGetter = (team) => {
  // set options for request
  let options = {
  	URL: `/https://api.mysportsfeeds.com/v1.1/pull/nfl/2017-2018-regular/overall_team_standings.json?team=${team}`,
  	Headers: {
  	  'User-Agent': 'request',
  	  'Authorization': `${Authorization}`
  	}
  };

  //request from API
  request(options, (err, res, body) => {
  	if (err) {
  	  console.log('There was an error: ', err);
  	} else {
  	// save each team to database
  	  let data = JSON.parse(body);
  	  data.map(team => {
  	  	db.save(team);
  	  });
  	}
  });
};

app.get('/stats', function (req, res) {
  db.selectAll(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});


//search for data from API and add to db
app.post('/stats', (req, err) => {
  console.log('------------', req.body);
});


app.listen(3000, function() {
  console.log('listening on port 3000!');
});

