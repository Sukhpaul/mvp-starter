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
    $.ajax({
      url: '/stats', 
      success: (data) => {
        this.setState({
          stats: data
        });
      },
      error: (err) => {
        console.log('err', err);
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