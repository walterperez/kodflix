const userRoutes = require("express").Router();
const bcrypt = require("bcrypt");
const { getDB } = require("../db");

// @route   GET /rest/user/sign/in
// @desc    Sign in using email and password
// @access  Public
userRoutes.get("/sign/in", (req, res) => {
  const db = getDB();
  const collection = db.collection("users");
  console.log(req.mySession);
  if (req.mySession.auth) {
    try {
      collection.findOne({ _id: req.mySession.auth }, (err, result) => {
        if (err) throw err;
        res.status(200).json({ message: "Correct Credentials" });
      });
    } catch (err) {
      res.status(200).json({ message: "User not logged yet!" });
    }
  }
});

// @route   POST /rest/user/sign/in
// @desc    Sign in using email and password
// @access  Public
userRoutes.post("/sign/in", (req, res) => {
  const db = getDB();
  const { email, password } = req.body;
  const collection = db.collection("users");
  collection.findOne({ email }, (err, result) => {
    if (err) throw err;
    bcrypt.compare(password, result.password, function(err, result) {
      if (err) throw err;
      if (result) {
        req.mySession.auth = result._id;
        res.setHeader("Auth", `${result._id}`);
        res.status(200).json({ message: "Correct Credentials" });
      } else {
        res.json({ error: "Error! User or Password incorrect!" });
      }
    });
  });
});

// @route   POST /rest/user/sign/up
// @desc    Sign up using email and password
// @access  Public
userRoutes.post("/sign/up", (req, res) => {
  const db = getDB();
  const errors = [];
  const { email, password } = req.body;
  const collection = db.collection("users");
  //Checking;
  //Check if emails doesnt exist
  collection.findOne({ email }, (err, result) => {
    //IF exits add a new error to errors array
    if (result) {
      errors.push("Email already exist.");
    }
    //checks done
    if (errors.length > 0) {
      res.status(401).json({ errors });
    } else {
      bcrypt.hash(password, 10, function(err, hash) {
        if (err) res(err);
        collection.insert({ email, password: hash }, (err, result) => {
          if (err) throw err;
          res.status(200).json({ message: "New user Added!" });
        });
      });
    }
  });
});

// @route   DELETE /rest/user/sign/out
// @desc    Sign out and delete cookies session
// @access  Public
userRoutes.post("/sign/out", (req, res) => {
  req.mySession = null;
  res.status(200).send("You are logged out!");
});

module.exports = userRoutes;
