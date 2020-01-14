import React from 'react'
import { Button } from 'react-bootstrap'
import playerService from '../services/players'

const Login = ({playerAlreadyExists, newPlayer}) => {

    const currentPlayer = async (event) => {
        event.preventDefault()
    
        const un = event.target.username.value
        const playersList = await playerService.getAll()
        const alreadeExistsUser = playersList.filter(p => p.username === un)
    
        if (alreadeExistsUser.length !== 0) {
    
          playerAlreadyExists(alreadeExistsUser)
    
        } else {
          newPlayer(un)
          
        }
      }

    return (
        <div>
        <form onSubmit={currentPlayer}>
          <input type="text" name="username" />
          <Button variant="outline-info" type="submit">Set username</Button>
        </form>
        <div>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <p>
            Set username and start playing! </p>
          <p>
            First you have 20 points. Press the button and lose 1 point, but if you press the button at the right time, you might win points!
          </p>
          <p>Timing is everything..</p></div>
      </div>
        )
}

export default Login