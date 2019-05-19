const express = require("express");
const app = express();
const bodyParser = require("body-parser");
// const movies = require("./moviesDB");
const path = require("path");

//Settings
const port = process.env.PORT || 3001;

//Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Body Parser Method
// app.use(
//   bodyParser.urlencoded({
//     extended: true
//   })
// );

//Fundamental, without this returns req.body = empty object for each post
// app.use(bodyParser.json()); //Fundamental, without this returns req.body = empty object for each post

//MongoDB
const db = require("./db");

db.connect().then(db => {
  //Static
  app.use(express.static(path.join(__dirname, "./../../build")));

  //Routes
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./../../build/", "index.html"));
  });

  app.get("/rest/shows", (req, res) => {
    let collection = db.collection("shows");
    collection.find({}).toArray(function(err, result) {
      err
        ? res.send(err)
        : result.length
        ? res.send(result)
        : res.send("No documents found");
    });
  });

  app.post("/rest/shows/add", (req, res) => {
    console.log(req.body);
  });

  app.get("/rest/shows/:movie", (req, res) => {
    let collection = db.collection("shows");
    let movieIdReq = req.params.movie;
    collection.findOne({ id: movieIdReq }, function(err, result) {
      err ? res.send(err) : res.send(result);
    });
  });

  //Server Run
  app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });
});
