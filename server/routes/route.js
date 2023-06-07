const { Router } = require('express');
const router = Router();
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'quadb',
  password: '19645125',
  port: 5432
});

router.get('/data', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM apis');
    const data = result.rows;
    client.release();
    res.json(data);
    console.log(data);
  } catch (error) {
    console.error('Error fetching data from the database:', error);
    res.status(500).json({ error: 'An error occurred while fetching data from the database' });
  }
});

module.exports = router;
