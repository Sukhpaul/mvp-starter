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
    console.log(this.state.team)
  }

  render() {
  return (
    <div>
    Find Team <input value={this.state.team} onChange={this.onChange.bind(this)}/>
    <button onClick={this.search.bind(this)}>Search</button>
    <h4> Most Recent Standings </h4>
    </div>
  )
  }

} 



export default Record;
    // { this.props.stats.map(item => <RecordItem item={item}/>)}