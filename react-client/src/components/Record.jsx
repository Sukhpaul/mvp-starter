//jshint esversion: 6
import React from 'react';
import RecordItem from './RecordItem.jsx';

class Record extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      team: ''
    };
  }

  onChange(event) {
    this.setState({
      team: event.target.value
    });
  }

  search() {
    this.props.onSearch(this.state.team);
  }

  playerChange(event) {
    this.setState({
      player: event.target.value
    });
  }

  playerSearch() {
    this.props.searchPlayer(this.state.player);
  }

  render() {
  return (
    <div>
    Find Team <input value={this.state.team} onChange={this.onChange.bind(this)}/>
    <button onClick={this.search.bind(this)}>Search</button>
    <br/>
    Find Player <input value={this.state.player} onChange={this.playerChange.bind(this)}/>
    <button onClick={this.playerSearch.bind(this)}>Search</button>
    </div>
  )
  }

} 



export default Record;
    // { this.props.stats.map(item => <RecordItem item={item}/>)}