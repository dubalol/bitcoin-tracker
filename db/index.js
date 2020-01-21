const { Pool } = require('pg');

const PG_URI = 'postgres://skffjapx:0Rs2YMb1DwGdGF7-m0sR_JC7r-8G_WzQ@rajje.db.elephantsql.com:5432/skffjapx';

const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => pool.query(text, params, callback),
};
