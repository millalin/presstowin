import React from 'react'
import { Button } from 'react-bootstrap'
import Statistics from './Statistics'


const Play = ({user, buttonPressed, exitUser, points}) => {

   

    return (
        <div>
        <div>
          </div>
        Current player: <b>{user.username}</b> &nbsp;
        <br></br>
        Change player: <Button variant="outline-info" onClick={exitUser}>Exit</Button>
        <div>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <h3>Good luck {user.username}! Let's play!</h3> &nbsp;&nbsp;
        
          <Button variant="info" className='play' onClick={buttonPressed}>Play</Button>
        </div>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
       <div>
          <Statistics points={points} />
        </div>
      </div>
        )
}

export default Play