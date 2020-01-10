require('dotenv').config()
const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')

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

  const playerSchema = mongoose.Schema({
    username: String,
    points: Number
  })
  
  //playerSchema.plugin(uniqueValidator)
  
  
  playerSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
  
  const Player = mongoose.model('Player', playerSchema)
  module.exports = Player