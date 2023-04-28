const mongoose = require('mongoose')

//  Format information is stored into database
postSchema = mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  bookmarked: {type: [String], required: false},
  favorited: {type: [{
    id: { type: String, required: true },
    score: { type: Number, required: false },
  }], required: false},
})

//  Exports the schema to be used by app.js
module.exports = mongoose.model('Post', postSchema)


