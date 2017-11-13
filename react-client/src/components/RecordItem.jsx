//jshint esversion: 6
import React from 'react';

const RecordItem = (props) => (
  <div>
    <ul>
    {props.team.map((player, index) => {
      return <li key={index}>
      		 <p>Name: {player.Name}</p>
      		 <p>Position: {player.Position}</p>
      		 <p>Points: {player.Ppg} Per Game</p>
      		 <p>Assits: {player.Ast} Per Game</p>
      		 <p>Rebounds: {player.Rebs} Per Game</p>
      		 </li>
    })}
    </ul>
  </div>
)

export default RecordItem;