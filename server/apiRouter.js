const express = require('express');

const router = express.Router();

const db = require('../db/index');
const authController = require('./authController');


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
// (1) if user exists
// (1a) get user salt and hash from db
// (1b) compare hashes and send response (portfolio information to populate state)
// (2) else prompt user to register
router.post('/authLogin',
  authController.verifyExistingUserExists,
  authController.compareHash,
  authController.getPortfolio,
  (req, res) => {
    console.log('hello from login final callback');
    // console.log('body of login request: ', req.body);
    return res.send({ portfolio: res.locals.portfolio[0] });
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
    console.log('hello from register final callback');
    // console.log('body of register request: ', req.body);
    // console.log('user portfolio: ', res.locals.portfolio[0]);
    return res.send({ portfolio: res.locals.portfolio[0] });
  });

module.exports = router;
