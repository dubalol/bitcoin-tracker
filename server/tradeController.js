/* eslint-disable camelcase */
const db = require('../db/index');

const tradeController = {};

tradeController.insertTrade = (req, res, next) => {
  const { username, rate, pair, amount, txn_type, datetime } = req.body;
  const newTradeSQL = `
    INSERT INTO trades (
      traded_at,
      username,
      pair,
      rate,
      amount,
      txn_type
    ) VALUES ($1, $2, $3, $4, $5, $6)
  `;
  
  db.query(newTradeSQL, [datetime, username, pair, rate, amount, txn_type], (err, sqlRes) => {
    if (err) return next(err);
    return next();
  });
};

tradeController.updatePortfolio = (req, res, next) => {
  const { username, rate, amount, usd_balance, btc_balance, txn_type } = req.body;
  const updatePortfolioSQL = `
    UPDATE users
    SET btc_balance=$1,
        usd_balance=$2
    WHERE username=$3
  `;
  let newBTCBalance;
  let newUSDBalance;
  
  if (txn_type === 'buy') {
    newBTCBalance = btc_balance + amount;
    newUSDBalance = usd_balance - (rate * amount);
  } else if (txn_type === 'sell') {
    newBTCBalance = btc_balance - amount;
    newUSDBalance = usd_balance + (rate * amount);
  } else {
    return next('invalid transaction type');
  }

  db.query(
    updatePortfolioSQL,
    [newBTCBalance, newUSDBalance, username],
    (err, sqlRes) => {
      if (err) return next(err);
      return next();
    },
  );
};

module.exports = tradeController;
