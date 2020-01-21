const express = require('express');
const fetch = require('node-fetch');

const db = require('../db/index');

const app = express();

const PORT = 3000;

// Test request
app.use('/', (req, res) => {
  res.send('Hello World');
});

const updatePricesSQL = `
  INSERT INTO prices (datetime, pair, price)
  VALUES ($1, $2, $3)
`;

// Test a fetch request to coinbase  --> THIS WORKS
fetch('https://api.coinbase.com/v2/exchange-rates?currency=BTC')
  .then((res) => res.json())
  .then((data) => {
    console.log(`1 BTC is worth ${data.data.rates.USD}`);
    db.query(updatePricesSQL, [new Date(), 'BTC-USD', data.data.rates.USD], (err, res) => {
      if (err) console.log(err.stack);
      else console.log(res.rows);
    });
  })
  .catch((err) => console.log(err));

// have app listen to port
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
