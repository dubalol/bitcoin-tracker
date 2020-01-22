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

// db.query(priceTableSQL);
db.query(usersTableSQL);
