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

mongoose.connect(`mongodb+srv://final:<password>@4830-final.ah3izq5.mongodb.net/?retryWrites=true&w=majority`)
  .then(()=>{
    console.log('Connected to database')
  })
  .catch(()=>{
    console.log('Connection error')
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


//  Adds a post to the MongoDB database
app.post("/api/lists",(req,res,next)=>{
  UserModel.findOneAndUpdate(
    { _id: req.body.id },
    { $set: { bookmarked: req.params.bookmarked, favorited: req.params.favorited }},
    (err) => {
      if (err) {
        console.log("Could not add book list to database")
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


//  Retrieves information from database
app.get('/api/lists', (req, res, next) => {
  UserModel.findOne({ _id: req.params.id }).then(document => {
    res.status(200).json({
      message: "Book Lists",
      favorited: document.favorited,
      bookmarked: document.bookmarked
    })
  })
});

app.delete('/api/lists/:id', (req, res, next) => {
  PostModel.deleteOne({_id:req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({message: "Post Deleted"});
  });
});


app.get('/', (req, res) => res.send('Hello World!'));

module.exports = app;
