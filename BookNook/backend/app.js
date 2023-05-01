const express = require('express');
const app = express();
const UserModel = require('./Models/user');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//  Connects to mongodb cluster using username and password
//  user:<password>


const password = "gNZ0vX9EgGfilTjB";

mongoose.connect(`mongodb+srv://final:${ password }@4830-final.ah3izq5.mongodb.net/?retryWrites=true&w=majority`)
  .then(()=>{
    console.log('Connected to database')
  })
  .catch((err)=>{
    console.log('Connection error')
    console.log(err);
  })





//  Set up CORS
app.use((req, res, next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  console.log('Middleware');
  next();
});

/***************** Test Commands for adding user *****************/
// const user = new UserModel({
//   username: "jermb",
//   password: "password"
// })

// user.save().then((newuser) => {
//   console.log(newuser);
// })

var userID;
UserModel.findOne({username: "jermb"}).then(user => {
  userID = user._id;
});

/***************** End Test Commands for adding user *****************/


//  Adds a post to the MongoDB database
app.post("/api/bookmarks",(req,res,next)=>{
  UserModel.findOneAndUpdate(
    { _id: userID },
    { $push: { bookmarked: req.body }},
    (err) => {
      if (err) {
        console.log("Could not push item to bookmark list on database")
      }
    }
  )
});
  // post.save().then(createPost => {
  //   res.status(201).json({
  //     message:'Post added successful',
  //     postId: createPost._id
  //   });
  // })
  // console.log(post)
// });

app.post("/api/favorites",(req,res,next)=>{
  UserModel.findOneAndUpdate(
    { _id: userID },
    { $push: { favorited: { book: req.body.book }}},
    (err) => {
      if (err) {
        console.log("Could not add bookmark list to database")
      }
    }
  )
});

app.post("/api/favorites/score",(req,res,next)=>{
  UserModel.findOneAndUpdate(
    { _id: userID, favorites: { $in: [{book}]} },
    { $push: { values: { book: req.params.book }}},
    (err) => {
      if (err) {
        console.log("Could not add bookmark list to database")
      }
    }
  )
});


//  Retrieves information from database
app.get('/api/bookmarks', (req, res, next) => {
  UserModel.findOne({ _id: userID }).then(document => {
    res.status(200).json({
      message: "Bookmark List",
      bookmarked: document.bookmarked
    })
  })
});

app.get('/api/favorites', (req, res, next) => {
  UserModel.findOne({ _id: userID }).then(document => {
    res.status(200).json({
      message: "Favorite List",
      favorited: document.favorited
    })
  })
});

app.delete('/api/bookmarks/:id', (req, res, next) => {
  UserModel.findOneAndUpdate(
    { _id: userID },
    { $pull: {bookmarked: req.params.id }}
  )
});

app.delete('/api/favorites/:id', (req, res, next) => {
  UserModel.findOneAndUpdate(
    { _id: userID },
    { $pull: {favorited: {id: req.params.id }}}
  )
});

app.post('/api/favorites/score', (req, res, next) => {
  UserModel.findOneAndUpdate(
    { _id: userID, "favorited.id": req.body.id },
    { $set: { "favorited.$.score": req.body.score }}
  )
})



app.get('/', (req, res) => res.send('Hello World!'));

module.exports = app;
