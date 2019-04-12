const express = require("express");
const app = express();
// const movies = require("./moviesDB");
const path = require("path");

//Settings
const port = process.env.PORT || 3001;

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

  //Server Run
  app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });
});
