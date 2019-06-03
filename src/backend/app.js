const express = require("express");
const { connect } = require("./db");
const sessions = require("client-sessions");
const app = express();
const path = require("path");

//Import routes
const showsRoutes = require("./routes/showsRoutes");
const userRoutes = require("./routes/userRoutes");

//Settings
const port = process.env.PORT || 3001;

//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  sessions({
    cookieName: "mySession", // cookie name dictates the key name added to the request object
    secret: process.env.COOKIE_SECRET, // should be a large unguessable string
    duration: 24 * 60 * 60 * 1000, // how long the session will stay valid in ms
    activeDuration: 1000 * 60 * 5, // if expiresIn < activeDuration, the session will be extended by activeDuration milliseconds
    cookie: {
      path: "/", // cookie will only be sent to requests under '/api'
      maxAge: 60000, // duration of the cookie in milliseconds, defaults to duration above
      ephemeral: false, // when true, cookie expires when the browser closes
      httpOnly: true, // when true, cookie is not accessible from javascript
      secure: false // when true, cookie will only be sent over SSL. use key 'secureProxy' instead if you handle SSL not in your node process
    }
  })
);

// Static;
app.use(express.static(path.join(__dirname, "./../../build")));
app.use("/movies", express.static(path.join(__dirname, "./../../movies")));

connect().then(db => {
  //Routes
  app.use("/rest/shows", showsRoutes);
  app.use("/rest/user", userRoutes);

  // @route   GET /
  // @desc    Send index.html
  // @access  Public
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./../../build/", "index.html"));
  });

  //Server Run
  app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });
});
