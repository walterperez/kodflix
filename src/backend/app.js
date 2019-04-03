const express = require("express");
const app = express();
// const port = 3000;

app.set("PORT",3000)

app.get("/", (req,res)=>{
    res.send("Hello World!");
})

app.listen(app.get("PORT"), ()=>{
    console.log(`Server running on port: ${app.get("PORT")}`);
})