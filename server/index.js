//jshint esversion: 6
let express = require('express');
let bodyParser = require('body-parser');
let request = require('request');
let auth = require('../auth.js');
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

//get stats from API
let statsGetter = (team) => {
  // set options for request
  // let options = {
  // 	URL: `/https://api.mysportsfeeds.com/v1.1/pull/nfl/2017-2018-regular/overall_team_standings.json`,
  // 	Headers: {
  // 	  'User-Agent': 'request',
  // 	  'Authorization':"Basic " + btoa(auth.Auth)

  // 	}
  // };

  // //request from API
  // request(options, (err, res, body) => {
  // 	if (err) {
  // 	  console.log('There was an error: ', err);
  // 	} else {
  // 	// save each team to database
  // 	  let data = JSON.parse(body);
  // 	  data.map(team => {
  // 	  	db.save(team);
  // 	  });
  // 	}
  // });

  (function(callback) {
    'use strict';
        
    const httpTransport = require('https');
    const responseEncoding = 'utf8';
    const httpOptions = {
        hostname: 'www.mysportsfeeds.com',
        port: '443',
        path: 'https://api.mysportsfeeds.com/v1.1/pull/nfl/latest/latest_updates.json',
        method: 'GET',
        headers: {"Authorization":"Basic " + 'U3VraHBhdWw6U3VraHBhdWw='}
    };
    httpOptions.headers['User-Agent'] = 'node ' + process.version;
 
    const request = httpTransport.request(httpOptions, (res) => {
        let responseBufs = [];
        let responseStr = '';
        
        res.on('data', (chunk) => {
            if (Buffer.isBuffer(chunk)) {
                responseBufs.push(chunk);
            }
            else {
                responseStr = responseStr + chunk;            
            }
        }).on('end', () => {
            responseStr = responseBufs.length > 0 ? 
                Buffer.concat(responseBufs).toString(responseEncoding) : responseStr;
            
            callback(null, res.statusCode, res.headers, responseStr);
        });
        
    })
    .setTimeout(0)
    .on('error', (error) => {
        callback(error);
    });
    request.write("")
    request.end();
    

})((error, statusCode, headers, body) => {
    console.log('ERROR:', error); 
    console.log('STATUS:', statusCode);
    console.log('HEADERS:', JSON.stringify(headers));
    console.log('BODY:', body);
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
  statsGetter(req.body.team);
});


app.listen(3000, function() {
  console.log('listening on port 3000!');
});

