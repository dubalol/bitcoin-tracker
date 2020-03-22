const express = require('express');

const router = express.Router();

const db = require('../db/index');
const authController = require('./authController');
const tradeController = require('./tradeController');


const getPriceFeed = `
  SELECT *
  FROM prices
  ORDER BY datetime desc
  LIMIT 50
`;

// CURRENT PRICE FEED END POINT
router.use('/prices', (req, res) => {
  db.query(getPriceFeed, [], (err, prices) => {
    if (err) console.log(err);
    return res.json(prices.rows);
  });
});


// Insert trade record
// Update portfolio record
// Get and send new portfolio
router.post('/trade',
  tradeController.insertTrade,
  tradeController.updatePortfolio,
  authController.getPortfolio,
  (req, res) => {
    return res.send({
      portfolio: res.locals.portfolio[0],
      userLoggedIn: req.body.username,
    });
  });

// Serve this page upon successful login
// Middleware chain should authenticate user
// (1) if user exists
// (1a) get user salt and hash from db
// (1b) compare hashes and send response (portfolio information to populate state)
// (2) else prompt user to register
router.post('/authLogin',
  authController.verifyExistingUserExists,
  authController.compareHash,
  authController.getPortfolio,
  (req, res) => {
    return res.send({
      portfolio: res.locals.portfolio[0],
      userLoggedIn: req.body.username,
    });
  });

// (1) confirm user does not already exist in database, otherwise prompt user
// (2) generate salt, hash password, and store record in db
// (3) generate portfolio
// (4) send back portfolio details
router.post('/authRegister',
  authController.verifyNewUserDoesNotExist,
  authController.generateSaltAndEncrypt,
  authController.createUserRecord,
  authController.getPortfolio,
  (req, res) => {
    return res.send({
      portfolio: res.locals.portfolio[0],
      userLoggedIn: req.body.username,
    });
  });

module.exports = router;
