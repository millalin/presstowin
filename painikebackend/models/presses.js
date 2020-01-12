const mongoose = require('mongoose')

  const pressesSchema = mongoose.Schema({
    pressed: Number
  })
    
  
  pressesSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
  
  const Presses = mongoose.model('Presses', pressesSchema)
  module.exports = Presses