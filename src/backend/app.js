const express = require("express");
const app = express();
const movies = require("./moviesDB");
const path = require("path");

//Settings
app.set("PORT", process.env.PORT || 3001);

//Static
app.use(express.static(path.join(__dirname, "./../../build")));

//Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './../../build/', 'index.html'));
});

app.get("/rest/shows", (req,res) => {
    res.send(movies);
});

//Server Run
app.listen(app.get("PORT"), ()=>{
    console.log(`Server running on port: ${app.get("PORT")}`);
});