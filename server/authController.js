const bcrypt = require('bcrypt');

const db = require('../db/index');

const saltRounds = 5; // recommended 12+ for production

const authController = {};

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
    res.send('Username already exists!');
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
