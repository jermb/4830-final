const express = require('express');
const app = express();
const UserModel = require('./Models/user');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const userRoutes = require('./routes/user');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//  Connects to mongodb cluster using username and password
//  user:<password>


const password = "gNZ0vX9EgGfilTjB";
var userID;

mongoose.connect(`mongodb+srv://final:${ password }@4830-final.ah3izq5.mongodb.net/?retryWrites=true&w=majority`)
  .then(()=>{
    console.log('Connected to database')
    // const user = new UserModel({
    //   username: "jermb",
    //   password: "password"
    // })

    // user.save().then((newuser) => {
    //   console.log(newuser);
    // })

    //
    UserModel.findOne({username: "jermb"}).then(user => {
      console.log("finding user");
      userID = user._id;
      console.log("user id is " + userID);
    })
    // .then(() => {
    //   UserModel.findOneAndUpdate(
    //     {_id: userID},
    //     {$addToSet: { favorited: {id: "OL45804W"}}}
    //   ).then(() => {
    //     console.log("added");
    //   });
    // })


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



/***************** End Test Commands for adding user *****************/


//  Adds a post to the MongoDB database
app.post("/api/bookmarks",(req,res)=>{
  UserModel.findOneAndUpdate(
    { _id: userID },
    { $addToSet: { bookmarked: req.body }}
  ).then(() => {
    res.status(201).json({
      message: "Book added to favorites successfully."
    })
  })
  .catch(err => {
    console.log("Could not add book to bookmarks.", err);
    res.status(500).json({ message: "Could not add book to bookmarks." });
  })
});
  // post.save().then(createPost => {
  //   res.status(201).json({
  //     message:'Post added successful',
  //     postId: createPost._id
  //   });
  // })
  // console.log(post)
// });

app.post("/api/favorites",(req,res)=>{
  UserModel.findOneAndUpdate(
    { _id: userID },
    { $addToSet: { favorited: { id: req.body.id }}}
  ).then(() => {
    console.log(req.body);
    res.status(201).json({
      message: "Book added to favorites successfully."
    })
  })
  .catch(err => {
    console.log("Could not add book to favorites.", err);
    res.status(500).json({ message: "Could not add book to favorites." });
  });
});

//  Retrieves information from database
app.get('/api/bookmarks', (req, res) => {
  UserModel.findOne({ _id: userID }).then(document => {
    res.status(200).json({
      message: "Bookmark List",
      bookmarked: document.bookmarked
    })
  })
});

app.get('/api/favorites', (req, res) => {
  UserModel.findOne({ _id: userID }).then(document => {
    res.status(200).json({
      message: "Favorite List",
      favorited: document.favorited
    })
  })
});

app.delete('/api/bookmarks/:id', (req, res) => {
  UserModel.findOneAndUpdate(
    { _id: userID },
    { $pull: {bookmarked: req.params.id }}
  )
});

app.delete('/api/favorites/:id', (req, res) => {
  UserModel.findOneAndUpdate(
    { _id: userID },
    { $pull: {favorited: {id: req.params.id }}}
  )
});

app.post('/api/favorites/score', (req, res) => {
  UserModel.findOneAndUpdate(
    { _id: userID, "favorited.book": req.body.id },
    { $set: { "favorited.$.score": req.body.score }}
  )
});


app.use("/api/user", userRoutes);

module.exports = app;
