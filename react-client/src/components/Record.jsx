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

  render() {
	return (
	  <div>
	  Find Team <input/>
	  <button>Search</button>
	  <h4> Most Recent Standings </h4>
	  { this.props.stats.map(item => <RecordItem item={item}/>)}
	  </div>
	)
  }

} 



export default Record;