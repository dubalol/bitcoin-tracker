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
  console.log('hello from api router');
  db.query(getPriceFeed, [], (err, prices) => {
    if (err) console.log(err);
    return res.json(prices.rows);
  });
});

// Serve this page upon successful login
// Middleware chain should authenticate user
router.use('/auth', (req, res) => {
  console.log('hello from auth route handler');
  return res.send('User is authorized');
});

module.exports = router;
