const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const WebSocket = require('ws');

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
// setInterval(() => {
//   receiver.getPrices();
// }, 10000);

// have app listen to port
const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

const wss = new WebSocket.Server({ server });
// console.log(wss);
// const ws = new WebSocket('ws://localhost:3000');

wss.on('connection', (ws) => {
  ws.on('message', (msg) => {
    console.log('SERVER GOT MSG: ', msg);
    ws.send('HELLO FROM SERVER');
  });
  // console.log('FROM WSS', msg);
});

// console.log('THE WEBSOCKET IS', wss);

// wss.on('connection', (ws) => {
//   // ws.on('message', (message) => {
//   //   console.log('received: %s', message);
//   // });

//   ws.send('something');
// });