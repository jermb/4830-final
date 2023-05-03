const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../Models/user");

const router = express.Router();

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


/**
 * Finds the user with the given username
 * Then checks the given password against hashed password stored in database.
 */
router.post("/login", (req, res, next) => {
  console.log("login try");
    let fetchedUser;
    User.findOne({ username: req.body.email })
      .then(user => {
        if (!user) {
          throw new Error("Auth failed");
          console.log(user);
          res.status(401).json({
            message: "Auth failed"
          });
          return;
        }
        fetchedUser = user;
        return bcrypt.compare(req.body.password, user.password);;
      })
      .then(result => {
        if (result == null) return;
        if (!result) {
          throw new Error("Auth failed");
          res.status(401).json({
            message: "Auth failed"
          });
          return;
        }
        const token = jwt.sign(
          { email: fetchedUser.username, userID: fetchedUser._id },
          "secret_this_should_be_longer",
          { expiresIn: "1h" }
        );
        res.status(200).json({
          message: "Auth Success",
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
