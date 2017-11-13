//jshint esversion: 6
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Record from './components/Record.jsx';
import RecordItem from './components/RecordItem.jsx';
import PlayerItem from './components/PlayerItem.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      team: [],
      player: []
    };
  }

  // componentDidMount() {

  //   //get data
  //   $.ajax({
  //     type: "GET",
  //     url: 'https://api.mysportsfeeds.com/v1.1/pull/nba/2016-2017-regular/cumulative_player_stats.json',
  //     dataType: 'json',
  //     async: false,
  //     headers: {
  //       "Authorization": 'Basic U3VraHBhdWw6U3VraHBhdWw='
  //     },
  //     success: function (data) {
  //       let players = [];
  //       data.cumulativeplayerstats.playerstatsentry.forEach(playerStats => {
  //           let player = {
  //             team: playerStats.team.City + ' ' + playerStats.team.Name,
  //             name: playerStats.player.FirstName + ' ' + playerStats.player.LastName,
  //             Position: playerStats.player.Position,
  //             Ppg: +playerStats.stats.PtsPerGame['#text'],
  //             Ast: +playerStats.stats.AstPerGame['#text'],
  //             Rebs: +playerStats.stats.RebPerGame['#text'],
  //           };
  //           players.push(player);
  //       });
  //       fetch('/stats', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'Accept': 'application/json'
  //           },
  //         body: JSON.stringify(players),
  //       })
  //        .then(data => {
  //          console.log('players stats were saved');
  //        })
  //        .catch(() => {
  //          console.log('players not found');
  //        });
  //     }
  //   });
  // }

  search(team) {
    // fetch topic from server
    console.log('Getting player data');
    fetch('/stats' + '/' + team, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        },
    })
     .then(data => {
       return data.json();
     })
     .then(team => {
        console.log(team);
        this.setState({team: team});
     })
     .catch((err) => {
       console.log(err);
     });
  }

  searchPlayer(player) {
    // fetch topic from server
    console.log('Getting player data');
    fetch('/player' + '/' + player, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        },
    })
     .then(data => {
       return data.json();
     })
     .then(player => {
        console.log(player);
        this.setState({team: player});
     })
     .catch((err) => {
       console.log(err);
     });
  }

  render () {
    let team = this.state.team;
    let player = this.state.player;
    console.log('running', player);
    return (<div>
      <h1>NBA Finder</h1>
      <Record onSearch={this.search.bind(this)} searchPlayer={this.searchPlayer.bind(this)}/>
      <RecordItem team={team}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));