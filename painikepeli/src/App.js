import React, { useState, useEffect } from 'react'
import playerService from './services/players'
import pressedService from './services/presses'
import { Table, Form, Button, Alert } from 'react-bootstrap'


const App = () => {
  const [points, setPoints] = useState(20)
  const [pressedtotal, setPressed] = useState(null)
  const [presses, setPresses] = useState([])
  const [players, setPlayers] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    playerService.getAll()
      .then(players => setPlayers(players))

    pressedService.getAll()
      .then(press => setPresses(press))
  }, [])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    console.log('logged', loggedUserJSON)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setPoints(user.points)
    }
  }, [])

  const winnings = (presses, pelaaja) => {

    if(presses % 500 === 0) {
      const changed2 = { ...pelaaja, points: pelaaja.points + 249 }
      updatePlayer(changed2)

      setNotification(`You won 250 points`)
    
    }
    else if(presses % 100 === 0) {
      const changed2 = { ...pelaaja, points: pelaaja.points + 39 }
      updatePlayer(changed2)

      setNotification(`You won 40 points`)
      
    }
    else if(presses % 10 === 0) {
      const changed2 = { ...pelaaja, points: pelaaja.points + 9 }
      updatePlayer(changed2)

      setNotification('You won 10 points')
    }
  }

  const setNotification = (notification) => {
    setMessage(notification)
    setTimeout(() => {
      setMessage(null)
    }, 4000)
  }

const updatePlayer = async (changed) => {
  const updatedPlayer = await playerService
  .update(changed)

setPlayers(players.map(player => player.username === user.username ? updatedPlayer : player))

setUser(updatedPlayer)
setPoints(updatedPlayer.points)

window.localStorage.setItem(
'loggedUser', JSON.stringify(updatedPlayer)
)
}

  const buttonPressed = async () => {

    const player = players.filter(p => p.username === user.username)
    const pelaaja = player[0]

    const changed = { ...pelaaja, points: pelaaja.points - 1 }

  updatePlayer(changed)    


    //painallus totaalilaskenta

    const oliopainallus = presses[0]
    const muutettu = { ...oliopainallus, pressed: oliopainallus.pressed + 1 }
    const updatedPresses1 = await pressedService.update(muutettu)
    setPressed(updatedPresses1.pressed)
    setPresses(presses.map(p => updatedPresses1))

   winnings(updatedPresses1.pressed, pelaaja)
  }



  const exitUser = () => {
    window.localStorage.removeItem(
      'loggedUser')
    setUser(null)
  }


  const currentPlayer = (event) => {
    event.preventDefault()

    const un = event.target.username.value

    const alreadeExistsUser = players.filter(p => p.username === un)
    if (alreadeExistsUser.length !== 0) {

      setUser(alreadeExistsUser[0])
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(alreadeExistsUser[0])
      )

      setPoints(alreadeExistsUser[0].points)

    } else {
      const playerObj = {
        username: un,
        points: "20"
      }

      playerService
        .create(playerObj)
        .then(data => {
          setPlayers(players.concat(data))
          console.log('data ', data)
          window.localStorage.setItem(
            'loggedUser', JSON.stringify(data)
          )
          setUser(data)
        })

      setPoints(20)
      event.target.username.value = ''
    }
  }


  const loginForm = () => (
    <form onSubmit={currentPlayer}>
      <input type="text" name="username" />
      <Button variant="outline-info" type="submit">Set username</Button>
    </form>
  )


  const playForm = () => (
    <div>
      Current player: <b>{user.username}</b>
      <br></br>
      Change player: <Button variant="outline-info"onClick={exitUser}>Exit</Button>
<div>
&nbsp;&nbsp;&nbsp;
<h2>Pelaa</h2>
      <Button variant="outline-info" onClick={buttonPressed}>pelaa</Button>
</div>
&nbsp;&nbsp;&nbsp;
     <div>
     <Statistics points={points} pressed={pressedtotal} />
     </div>
    </div>
  )


  return (
    <div class="container" >
      <div class="text-center" >
      {(message &&
        <Alert variant="info">
          {message}
        </Alert>
      )}
        {user === null && loginForm()}

        {user !== null && playForm()}
      </div>

    </div>
  )
}



const Statistics = ({ points, pressed }) => {
  const total = points
  const p = pressed

  if (total === 0) {
    return (
      <div>
        <h2>peli</h2>
        <p>Pisteiden palautus?</p>
      </div>
    )
  }

  return (
    <div>
      <h2>Pisteet</h2>
    <div>
      Omat pisteet: {points}
    </div>
 
    </div>
  )
}

export default App;
