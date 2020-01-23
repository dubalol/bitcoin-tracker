const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const WebSocket = require('ws');

const receiver = require('./receiver');
const apiRouter = require('./apiRouter');

const app = express();

const PORT = 3000;

const ws = new WebSocket('wss://ws-feed.pro.coinbase.com');

// ws.on('open', () => {

//   const subscription = {
//     type: 'subscribe',
//     product_ids: [
//       'BTC-USD',
//     ],
//     channels: [
//       {
//         name: 'ticker',
//         product_ids: [
//           'BTC-USD',
//         ],
//       },
//     ],
//   };
//   ws.send(JSON.stringify(subscription));
// });

// ws.on('message', (msg) => {
//   console.log(msg);
// });

console.log('THE WEBSOCKET IS', ws);

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
setInterval(() => {
  receiver.getPrices();
}, 10000);

// have app listen to port
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
