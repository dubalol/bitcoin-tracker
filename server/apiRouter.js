const express = require('express');

const router = express.Router();

const db = require('../db/index');

// for testing purposes
const response = { success: 'Heres your response' };

const getPriceFeed = `
  SELECT *
  FROM prices
`;

router.use('/test', (req, res) => {
  db.query(getPriceFeed, [], (err, prices) => {
    if (err) console.log(err);
    else console.log(prices.rows);
  });
  // res.json(response);
});

module.exports = router;
