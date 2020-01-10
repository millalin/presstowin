const router = require('express').Router()

router.post('/', async (request, response, next) => {
    const body = request.body
  
    console.log('body ', body.username)
    console.log('b', body.points)
    const player = new Player({
      username: body.username,
      points: body.points
    })
    
    player
      .save()
      .then(savedPlayer => savedPlayer.toJSON())
      .then(updatedPointsPlayer => {
        response.json(updatedPointsPlayer)
      })
      .catch(error => next(error))
  })