const express = require("express");
const app = express();
const movies = require("./moviesDB");

app.set("PORT",3000);

app.get("/rest/shows", (req,res)=>{
    res.send(movies);
})

app.listen(app.get("PORT"), ()=>{
    console.log(`Server running on port: ${app.get("PORT")}`);
})