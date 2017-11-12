//jshint esversion: 6
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Record from './components/Record.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      stats: []
    };
  }

  componentDidMount() {
    // $.ajax({
    //   url: '/stats', 
    //   success: (data) => {
    //     this.setState({
    //       stats: data
    //     });
    //   },
    //   error: (err) => {
    //     console.log('err', err);
    //   }
    // });

    $.ajax({
      type: "GET",
      url: 'https://api.mysportsfeeds.com/v1.0/pull/nfl/latest/overall_team_standings.json',
      dataType: 'json',
      async: false,
      headers: {
        "Authorization": 'Basic U3VraHBhdWw6U3VraHBhdWw='
      },
      success: function (data){
        console.log(data);
        alert('Thanks for your comment!'); 
      }
    });
  }

  search(team) {
    // fetch topic from server
    console.log('Searching for data');
    fetch('/stats', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        },
      body: JSON.stringify({
        team: team
      }),
    })
     .then(data => {
       console.log('---------', data);
     })
     .catch(() => {
       console.log('Data not found');
     });
  }

  render () {
    return (<div>
      <h1>NFL Standings</h1>
      <Record onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));