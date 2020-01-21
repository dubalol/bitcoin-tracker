const fetch = require('node-fetch');

const db = require('../db/index');

const updatePricesSQL = `
  INSERT INTO prices (datetime, pair, price)
  VALUES ($1, $2, $3)
`;

// Test a fetch request to coinbase  --> THIS WORKS
module.exports = {
  getPrices: () => {
    fetch('https://api.coinbase.com/v2/exchange-rates?currency=BTC')
      .then((res) => res.json())
      .then((data) => {
        const { USD } = data.data.rates;
        console.log(`1 BTC is worth ${USD}`);
        db.query(updatePricesSQL, [new Date(), 'BTC-USD', USD], (err, res) => {
          if (err) console.log(err.stack);
          else console.log(res.rows);
        });
      })
      .catch((err) => console.log(err));
  }
}
