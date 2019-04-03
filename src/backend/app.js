const express = require("express");
const app = express();
const movies = require("./moviesDB");

//Settings
app.set("PORT", 3001);

//Routes
app.get("/rest/shows", (req,res)=>{
    res.send(movies);
})

//Server Run
app.listen(app.get("PORT"), ()=>{
    console.log(`Server running on port: ${app.get("PORT")}`);
})