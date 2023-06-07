const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const { fetchAndStoreAPIData } = require('./apiFetcher');

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'quadb',
  password: '19645125',
  port: 5432
});

app.use('/api', require('./routes/route'));

const server = app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

fetchAndStoreAPIData(pool).catch((error) => {
  console.error('Error in fetchAndStoreAPIData:', error);
  server.close();
});
