//jshint esversion: 6
import React from 'react';

const PlayerItem = (props, index) =>  {
  console.log('player item', props)
  return (
    <div>
      <ul>
        <li key={index}>
    		 <p>Name: {props.player.name}</p>
    		 <p>Position: {props.player.Position}</p>
    		 <p>Points: {props.player.Ppg} Per Game</p>
    		 <p>Assits: {props.player.Ast} Per Game</p>
    		 <p>Rebounds: {props.player.Rebs} Per Game</p>
    		 </li>
      </ul>
    </div>
)}

export default PlayerItem;