const bcrypt = require('bcrypt');

const db = require('../db/index');

const saltRounds = 5; // recommended 12+ for production

const authController = {};

// Existing User Login Middleware
authController.verifyExistingUserExists = (req, res, next) => {
  const { username } = req.body;
  console.log('from login verify middleware: ', username);
  const checkUserSQL = `
    SELECT COUNT(*)
    FROM users
    WHERE username=$1
  `;
  db.query(checkUserSQL, [username], (err, sqlRes) => {
    if (err) return next(err);
    if (sqlRes.rows[0].count === '0') {
      console.log('user probably does not exist');
      return res.send({ msg: 'Invalid username or password-user' });
    }
    // if no error and count > 0, username should exist
    return next();
  });
};

authController.compareHash = (req, res, next) => {
  const { username, password } = req.body;
  console.log('from hash compare middleware');
  const getHashSQL = `
    SELECT hashed_pw
    FROM users
    WHERE username=$1
  `;
  db.query(getHashSQL, [username], (errSQL, sqlRes) => {
    if (errSQL) return next(errSQL);
    const hash = sqlRes.rows[0].hashed_pw;
    bcrypt.compare(password, hash, (errBC, result) => {
      if (errBC) return next(errBC);
      if (result) return next();
      return res.send({ msg: 'Invalid username or password-hash' });
    });
    // return here to prevent hanging contenxt?
  });
};

// New User Registration Middleware
authController.verifyNewUserDoesNotExist = (req, res, next) => {
  const { username } = req.body;
  console.log('username from middleware: ', username);
  const checkUserSQL = `
    SELECT COUNT(*)
    FROM users
    WHERE username=$1
  `;
  db.query(checkUserSQL, [username], (err, sqlRes) => {
    if (err) return next(err);
    console.log(sqlRes.rows[0]);
    if (sqlRes.rows[0].count === '0') {
      console.log('user probably does not exist');
      return next();
    }
    // short circuit middleware if user already exists
    return res.send({ msg: 'Username already exists!' });
  });
};

authController.generateSaltAndEncrypt = (req, res, next) => {
  console.log('from encrypter: ', req.body);
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    if (err) return next(err);
    res.locals.hash = hash;
    return next();
  });
};

authController.createUserRecord = (req, res, next) => {
  console.log('from record creator');
  const { username } = req.body;
  const { hash } = res.locals;
  const newUserSQL = `
    INSERT INTO users (
      created_at,
      username,
      hashed_pw,
      salt,
      USD_balance,
      BTC_balance
    ) VALUES ($1, $2, $3, $4, $5, $6)
  `;
  db.query(newUserSQL, [new Date(), username, hash, hash, 100000, 0], (err, sqlRes) => {
    if (err) return next(err);
    console.log('user creation was successful');
    // console.log(sqlRes);
    next();
  });
};

authController.getPortfolio = (req, res, next) => {
  const { username } = req.body;
  const getPortfolioSQL = `
    SELECT USD_balance, BTC_balance
    FROM users
    WHERE username=$1
  `;
  db.query(getPortfolioSQL, [username], (err, sqlRes) => {
    if (err) return next(err);
    res.locals.portfolio = sqlRes.rows;
    return next();
  });
};


module.exports = authController;
