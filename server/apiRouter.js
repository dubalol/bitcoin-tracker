const express = require('express');

const router = express.Router();

const db = require('../db/index');


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
router.post('/auth', (req, res) => {
  console.log('hello from auth route handler');
  console.log('body of auth request: ', req.body);
  return res.send('User is authorized');
});

module.exports = router;
