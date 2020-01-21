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

db.query(priceTableSQL);
