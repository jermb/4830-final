const express = require('express');
const app = express();
const UserModel = require('./Models/user');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const userRoutes = require('./routes/user');
// const userID = require('./userID').userID
const jwt = require("jsonwebtoken");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


/**
 * Connects to mongodb cluster using username and password
 * user:<password>
 */
const password = "gNZ0vX9EgGfilTjB";
mongoose.connect(`mongodb+srv://final:${ password }@4830-final.ah3izq5.mongodb.net/?retryWrites=true&w=majority`)
  .then(()=>{
    console.log('Connected to database')
  })
  .catch((err)=>{
    console.log('Connection error')
    console.log(err);
  })


const secret = "secret_this_should_be_longer";
const userIDFunct = (token) => {
  // verify token and get payload data
  return jwt.verify(token, secret, (err, payload) => {
    if (err) {
        console.log('Invalid token');
    } else {
        return payload.userID;
    }
  });
};


/**
 * Set up CORS
 */
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


/**
 * Adds a bookID to the bookmarked list
 */
app.post("/api/bookmarks/add",(req,res)=>{
  UserModel.findOneAndUpdate(
    { _id: userIDFunct(req.body.token) },
    { $addToSet: { bookmarked: req.body.id }}
  ).then(() => {
    res.status(201).json({
      message: "Book added to bookmarks successfully."
    })
  })
  .catch(err => {
    console.log("Could not add book to bookmarks.", err);
    res.status(500).json({ message: "Could not add book to bookmarks." });
  })
});


/**
 * Accepts BookID and adds it to favorited list.
 */
app.post("/api/favorites/add",(req,res)=>{
  UserModel.findOneAndUpdate(
    { _id: userIDFunct(req.body.token) },
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


/**
 * Returns the User's Bookmarked list from database
 */
app.post('/api/bookmarks', (req, res) => {
  UserModel.findOne({ _id: userIDFunct(req.body.token) }).then(user => {
    if (!user) return;
    res.status(200).json({
      message: "Bookmark List",
      bookmarked: user.bookmarked
    })
  })
});


/**
 * Returns the User's Favorited list from database
 */
app.post('/api/favorites', (req, res) => {
  UserModel.findOne({ _id: userIDFunct(req.body.token) }).then(user => {
    if (!user) return;
    res.status(200).json({
      message: "Favorite List",
      favorited: user.favorited
    })
  })
});


/**
 * Accepts bookID as paramater in url
 * Removes that book from the bookmarked list
 */
app.delete('/api/bookmarks/:id', (req, res) => {
  UserModel.findOneAndUpdate(
    { _id: userIDFunct(req.body.token) },
    { $pull: {bookmarked: req.params.id }}
  ).then(() => {
    res.status(201).json({
      message: "Book succefully deleted from bookmarks."
    })
  })
  .catch(err => {
    console.log("Could not delete book from bookmarks.", err);
    res.status(500).json({ message: "Could not delete book from bookmarks." });
  })
});


/**
 * Accepts bookID as paramater in url
 * Removes that book/score object from the favorited list
 */
app.delete('/api/favorites/:id', (req, res) => {
  UserModel.findOneAndUpdate(
    { _id: userIDFunct(req.body.token) },
    { $pull: {favorited: {id: req.params.id }}}
  ).then(() => {
    res.status(201).json({
      message: "Book succefully deleted from favorites."
    })
  })
  .catch(err => {
    console.log("Could not delete book from favorites.", err);
    res.status(500).json({ message: "Could not delete book from favorites." });
  })
});


/**
 * Accepts bookID[string] and score[number] as paramater in url
 * Sets that bookID to have corresponding score in favorited list
 */
app.post('/api/favorites/score', (req, res) => {
  UserModel.findOneAndUpdate(
    { _id: userID.value, "favorited.id": req.body.id },
    { $set: { "favorited.$.score": req.body.score }}
  ).then(() => {
    res.status(201).json({
      message: "Book succefully scored."
    })
  })
  .catch(err => {
    console.log("Could not set book score.", err);
    res.status(500).json({ message: "Could not set book score." });
  })
});


/**
 * Adds Login stuff to express
 */
app.use("/api/user", userRoutes);

module.exports = app;
