import React, { useState, useEffect } from 'react'
import playerService from './services/players'
import pressedService from './services/presses'
import { Alert } from 'react-bootstrap'
import LoginForm from './components/LoginForm'
import PlayForm from './components/PlayForm'


const App = () => {
  const [points, setPoints] = useState(20)
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
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setPoints(user.points)
    }
  }, [])


  const winnings = (presses, currentPlayer) => {

    if (presses % 500 === 0) {
      const changed2 = { ...currentPlayer, points: currentPlayer.points + 249 }
      updatePlayer(changed2, user)

      setNotification(`You won 250 points`)
    }
    else if (presses % 100 === 0) {
      const changed2 = { ...currentPlayer, points: currentPlayer.points + 39 }
      updatePlayer(changed2, user)

      setNotification(`You won 40 points`)
    }
    else if (presses % 10 === 0) {
      const changed2 = { ...currentPlayer, points: currentPlayer.points + 9 }
      updatePlayer(changed2, user)

      setNotification('You won 10 points')
    }
  }


  const setNotification = (notification) => {
    setMessage(notification)
    setTimeout(() => {
      setMessage(null)
    }, 4000)
  }


  const updatePlayer = async (changed, curUser) => {
    const updatedPlayer = await playerService
      .update(changed)
    setPlayers(players.map(player => player.username === curUser.username ? updatedPlayer : player))
    setUser(updatedPlayer)
    setPoints(updatedPlayer.points)

    window.localStorage.setItem(
      'loggedUser', JSON.stringify(updatedPlayer)
    )
  }


  const buttonPressed = async () => {

    const updateCurrentPresses = await pressedService.getAll()
    const allCurrentPressesFromPlayers = updateCurrentPresses[0]

    const player = players.filter(p => p.username === user.username)
    const playerNow = player[0]
    const changed = { ...playerNow, points: playerNow.points - 1 }

    if (points === 0 || points < 0) {
      if (window.confirm('Do you want to start again?')) {

        const changed2 = { ...playerNow, points: 20 }
        updatePlayer(changed2, user)
        setNotification('You have 20 points again. Good luck!')

      } else {
        const changed3 = { ...playerNow, points: 0 }
        updatePlayer(changed3, user)
        setNotification('New game cancelled. You have still 0 points. Play again?')
      }
    } else {
      updatePlayer(changed, user)

      const changedPressCount = { ...allCurrentPressesFromPlayers, pressed: allCurrentPressesFromPlayers.pressed + 1 }
      const updatedPressesCount = await pressedService.update(changedPressCount)
      setPresses(presses.map(p => updatedPressesCount))

      winnings(updatedPressesCount.pressed, playerNow)
    }
  }


  const exitUser = async (event) => {
    event.preventDefault()

    const player = players.filter(p => p.username === user.username)
    const playerNow = player[0]
    const changed = { ...playerNow, online: false }

    const updatedPlayer = await playerService
      .update(changed)
    setPlayers(players.map(player => player.username === user.username ? updatedPlayer : player))
    setUser(null)

    window.localStorage.removeItem(
      'loggedUser')
  }

  const playerAlreadyExists = (alreadeExistsUser) => {
    if (alreadeExistsUser[0].online === true) {
      setNotification('User with this username already playing')
      setUser(null)
    } else {
      setUser(alreadeExistsUser[0])
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(alreadeExistsUser[0])
      )
      setPoints(alreadeExistsUser[0].points)
      setNotification('Welcome back! You have played before, continue playing!')

      const c = { ...alreadeExistsUser[0], online: true }
      updatePlayer(c, alreadeExistsUser[0])
    }
  }

  const newPlayer = (un) => {
    const playerObj = {
      username: un,
      points: "20",
      online: true
    }
    setNotification('Welcome to Press To Win! You can start playing now')

    playerService
      .create(playerObj)
      .then(data => {
        setPlayers(players.concat(data))

        window.localStorage.setItem(
          'loggedUser', JSON.stringify(data)
        )
        setUser(data)
      })

    setPoints(20)
  }



  return (
    <div className="container" >
      <div className="text-center" >
        {(message &&
          <Alert variant="secondary">
            {message}
          </Alert>
        )}
        {user === null && <LoginForm playerAlreadyExists={playerAlreadyExists} newPlayer={newPlayer} />}

        {user !== null && <PlayForm user={user} points={points} exitUser={exitUser} buttonPressed={buttonPressed} />}
      </div>

    </div>
  )
}





export default App;