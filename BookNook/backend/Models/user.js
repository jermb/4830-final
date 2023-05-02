const mongoose = require('mongoose')

//  Format information is stored into database
userSchema = mongoose.Schema({
  username: {type: String, required: true,  unique: true},
  password: {type: String, required: true},
  bookmarked: {type: [String], required: false},
  favorited: {type: [{
    id: { type: String, required: true, unique: true },
    score: { type: Number, required: false },
  }], required: false},
})

//  Exports the schema to be used by app.js
module.exports = mongoose.model('User', userSchema)


