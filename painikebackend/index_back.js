require('dotenv').config()
const express = require('express')

const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const Player = require('./models/player')
const Presses = require('./models/presses')
const http = require('http')
const app = express()
app.use(bodyParser.json())
app.use(cors())

app.use(express.static('build'))


mongoose.set('useFindAndModify', false)


const url = process.env.MONGODB_URI

console.log('connecting to', url)


mongoose.connect(url, { useNewUrlParser: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

app.get('/', (req, res) => {
  res.send('<h1>Play!</h1>')
})
app.get('/api/players', (req, res, next) => {

  Player.find({}).then(player => {
    res.json(player.map(p => p.toJSON()))
  })
    .catch(error => next(error))
})


app.get('/api/players/:id', (request, response, next) => {
  Player.findById(request.params.id)
    .then(player => {
      if (player) {
        response.json(player.toJSON())
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})



app.post('/api/players', async (request, response, next) => {
  const body = request.body

  const player = new Player(request.body)
  
  const result=
  await
  player
    .save()

   response.status(201).json(result.toJSON())

})


app.put('/api/players/:id', (request, response, next) => {
  
  const body = request.body
  
  const player = {
    username: body.username,
    points: body.points,
    online: body.online,
  }
  
  
  Player
    .findByIdAndUpdate(request.params.id, player, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson.toJSON())
    })
    .catch(error => next(error))
})




app.get('/api/presses', (req, res, next) => {

  Presses.find({}).then(p => {
    res.json(p.map(p => p.toJSON()))
  })
    .catch(error => next(error))
})


app.get('/api/presses/:id', (request, response, next) => {
  Presses.findById(request.params.id)
    .then(p => {
      if (p) {
        response.json(p.toJSON())
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})



app.post('/api/presses', async (request, response, next) => {

  const pre = new Presses(request.body)
  
  const result=
  await
  pre
    .save()

   response.status(201).json(result.toJSON())

})


app.put('/api/presses/:id', (request, response, next) => {
  console.log('hearerit', request.headers)
  
  const body = request.body
  
  const p = {
    pressed: body.pressed,
  }
  
  Presses
    .findByIdAndUpdate(request.params.id, p, { new: true })
    .then(updated => {
      response.json(updated.toJSON())
    })
    .catch(error => next(error))
})





const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).json({ error: error.message }).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') { return response.status(400).json({ error: error.message }) }
  next(error)
}

app.use(errorHandler)

const server = http.createServer(app)


const PORT = process.env.PORT || 3001
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})