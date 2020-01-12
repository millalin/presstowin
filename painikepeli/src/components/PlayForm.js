import React from 'react'
import { Button } from 'react-bootstrap'
import Statistics from './Statistics'


const Play = (props) => {

   

    return (
        <div>
        <div>
          </div>
        Current player: <b>{props.user.username}</b> &nbsp;
        <br></br>
        Change player: <Button variant="outline-info" onClick={props.exitUser}>Exit</Button>
        <div>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <h3>Good luck {props.user.username}! Let's play!</h3> &nbsp;&nbsp;
        
          <Button variant="info" onClick={props.buttonPressed}>Play</Button>
        </div>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
       <div>
          <Statistics points={props.points} />
        </div>
      </div>
        )
}

export default Play