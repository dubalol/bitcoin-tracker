const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const WebSocket = require('ws');

const apiRouter = require('./apiRouter');

const app = express();

const PORT = 3000;


app.use(bodyParser.json());

app.use('/api', apiRouter);

// Serves up bundle
app.get('/build/bundle.js', (req, res) => {
  const bundle = path.resolve(__dirname, '../build/bundle.js');
  return res.sendFile(bundle);
});

app.get('/index.js', (req, res) => {
  const loginPage = path.resolve(__dirname, '../index.js');
  return res.sendFile(loginPage);
});

// Initial HTML
app.use('/', (req, res) => {
  const html = path.resolve(__dirname, '../index.html');
  return res.sendFile(html);
});

app.use((err, req, res, next) => {
  console.log('Global error handled invoked with: ', err);
});

const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

const wss = new WebSocket.Server({ server });

// This needs to happen before client opens a connection with server
const wsCB = new WebSocket('wss://ws-feed.pro.coinbase.com');

wsCB.onopen = () => {
  const subscription = {
    type: 'subscribe',
    product_ids: [
      'BTC-USD',
    ],
    channels: [
      {
        name: 'ticker',
        product_ids: [
          'BTC-USD',
        ],
      },
    ],
  };
  wsCB.send(JSON.stringify(subscription));
};

wss.on('connection', (ws) => {
  ws.on('message', (msg) => {
    // Communicate with client
  });

  // Send all messages from 3rd party API to client
  wsCB.onmessage = (msgCB) => {
    const parsedData = JSON.parse(msgCB.data);
    const { price, time } = parsedData;
    ws.send(JSON.stringify({
      price,
      time,
    }));
  };
});

// Ensure 3rd party websocket closes
setTimeout(() => wsCB.close(), 20000);
