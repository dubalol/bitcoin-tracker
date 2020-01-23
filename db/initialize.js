// THIS SCRIPT SHOULD ONLY BE RUN ONCE
const db = require('./index');

// Create price table
const priceTableSQL = `
  CREATE TABLE prices (
    _id serial PRIMARY KEY,
    datetime TIMESTAMP NOT NULL,
    pair VARCHAR NOT NULL,
    price VARCHAR NOT NULL
  )
`;

const usersTableSQL = `
    CREATE TABLE users (
      _id serial PRIMARY KEY,
      created_at TIMESTAMP NOT NULL,
      username VARCHAR NOT NULL,
      hashed_pw VARCHAR NOT NULL,
      salt VARCHAR NOT NULL,
      USD_balance VARCHAR,
      BTC_balance VARCHAR
    )
`;

const tradesTableSQL = `
      CREATE TABLE trades (
        _id serial PRIMARY KEY,
        traded_at TIMESTAMP NOT NULL,
        username VARCHAR NOT NULL,
        pair VARCHAR NOT NULL,
        rate VARCHAR NOT NULL,
        amount VARCHAR NOT NULL,
        txn_type VARCHAR NOT NULL
      )
`;

// db.query(priceTableSQL);
// db.query(usersTableSQL);
// db.query(tradesTableSQL);
