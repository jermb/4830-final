const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../Models/user");

const router = express.Router();

// const userID = require('../userID').userID

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash
    });
    user
      .save()
      .then(result => {
        res.status(201).json({
          message: "User created!",
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });
});

router.post("/login", (req, res, next) => {
    let fetchedUser;
    User.findOne({ username: req.body.email })
      .then(user => {
        if (!user) {
          res.status(401).json({
            message: "Auth failed"
          });
          return;
        }
        fetchedUser = user;
        return bcrypt.compare(req.body.password, user.password);;
      })
      .then(result => {
        if (result == undefined) return;
        if (!result) {
          res.status(401).json({
            message: "Auth failed"
          });
          return;
        }
        // userID.value = fetchedUser._id;
        // console.log("UserID set to " + userID.value);
        const token = jwt.sign(
          { email: fetchedUser.username, userID: fetchedUser._id },
          "secret_this_should_be_longer",
          { expiresIn: "1h" }
        );
        res.status(200).json({
          userID: fetchedUser._id,
          token: token,
          expiresIn: 3600
        });
      })
      .catch(err => {
        console.log(err);
        res.status(401).json({
          message: "Auth failed"
        });
      });
  });

  router.post("/logout", (req, res) => {
    userID.value = null;
  })

  module.exports = router;
