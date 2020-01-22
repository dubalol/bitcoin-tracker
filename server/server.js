const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const receiver = require('./receiver');
const apiRouter = require('./apiRouter');

const app = express();

const PORT = 3000;

// Test this
// app.use(express.static(path.resolve(__dirname, '/public')));
app.use(bodyParser.json());

// API route
app.use('/api', apiRouter);

// Serves up bundle IN PRODUCTION MODE
app.get('/build/bundle.js', (req, res) => {
  console.log('hello from /build/bundle route handler');
  const bundle = path.resolve(__dirname, '../build/bundle.js');
  return res.sendFile(bundle);
});

// Serve index.js in root, to facilitate auth/login
app.get('/index.js', (req, res) => {
  const loginPage = path.resolve(__dirname, '../index.js');
  return res.sendFile(loginPage);
});

// Initial HTML file, log in page
app.use('/', (req, res) => {
  // res.send('Hello World');
  const html = path.resolve(__dirname, '../index.html');
  return res.sendFile(html);
});

app.use((err, req, res, next) => {
  console.log('GLOBAL ERROR HANDLER REACHED: ', err);
});


// This will eventually go into a setInterval while server is running
// This will then eventually be replaced with a websocket feed
// receiver.getPrices();

// have app listen to port
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
