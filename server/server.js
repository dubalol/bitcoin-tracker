const express = require('express');
const path = require('path');

const receiver = require('./receiver');
const apiRouter = require('./apiRouter');

const app = express();

const PORT = 3000;


// API route
app.use('/api', apiRouter);

// Upon successful login
// Middleware chain should authenticate user
app.get('/client/index.html', (req, res) => {
  const mainView = path.resolve(__dirname, '../client/index.html');
  res.sendFile(mainView);

});

// To eventually serve up bundle IN PRODUCTION MODE
app.get('/build/bundle.js', (req, res) => {
  const bundle = path.resolve(__dirname, '../client/index.js');
  res.sendFile(bundle);
});

// Initial HTML file
app.use('/', (req, res) => {
  // res.send('Hello World');
  const html = path.resolve(__dirname, '../index.html');
  res.sendFile(html);
});


// This will eventually go into a setInterval while server is running
// This will then eventually be replaced with a websocket feed
// receiver.getPrices();

// have app listen to port
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
