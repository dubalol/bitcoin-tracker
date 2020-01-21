const express = require('express');
const fetch = require('node-fetch');

const app = express();

const PORT = 3000;

// Test request
app.use('/', (req, res) => {
  res.send('Hello World');
});

// Test a fetch request to coinbase  --> THIS WORKS
// fetch('https://api.coinbase.com/v2/exchange-rates?currency=BTC')
//   .then((res) => res.json())
//   .then((data) => {
//     console.log(`1 BTC is worth ${data.data.rates.USD}`);
//   })
//   .catch((err) => console.log(err));

// have app listen to port
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
