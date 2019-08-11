const express = require('express');
const { connect } = require('./db');
const app = express();
const path = require('path');
const jwt = require('jsonwebtoken');
const cookieParse = require('cookie-parser');
const { TOKEN_SECRET } = require('./config/var');

//Import routes
const showsRoutes = require('./routes/showsRoutes');
const userRoutes = require('./routes/userRoutes');

//Settings
const port = process.env.PORT || 3001;

//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParse());
app.use((req, _, next) => {
  try {
    const accessToken = req.cookies['access-token'];
    const data = jwt.verify(accessToken, TOKEN_SECRET);
    req.userId = data.userId;
  } catch (e) {}
  next();
});

// Static;
app.use(express.static(path.join(__dirname, './../../build')));
app.use('/movies', express.static(path.join(__dirname, './../../movies')));

connect().then(db => {
  //Routes
  app.use('/rest/shows', showsRoutes);
  app.use('/rest/user', userRoutes);

  // @route   GET /
  // @desc    Send index.html
  // @access  Public
  app.get('/', (req, res) => {
    console.log('req', req.cookies);
    res.sendFile(path.join(__dirname, './../../build/', 'index.html'));
  });

  //Server Run
  app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });
});
