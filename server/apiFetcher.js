const fetch = require('isomorphic-fetch');
const { Pool } = require('pg');

async function fetchAndStoreAPIData(pool) {
  try {
    const response = await fetch('https://api.wazirx.com/api/v2/tickers');
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const responseData = await response.json();
    console.log('API Response Data:', responseData);
    console.log('Type of API Response Data:', typeof responseData);

    if (typeof responseData !== 'object' || Array.isArray(responseData)) {
      throw new Error('API response data is not an object');
    }

    const top10Results = Object.values(responseData).slice(0, 10);

    const client = await pool.connect();

    await client.query('DELETE FROM apis WHERE ctid IN (SELECT ctid FROM (SELECT DISTINCT ON (name) ctid FROM apis) x)');

    for (const result of top10Results) {
      const { name, last, buy, sell, volume, base_unit } = result;

      await client.query(
        'INSERT INTO apis (name, last, buy, sell, volume, base_unit) VALUES ($1, $2, $3, $4, $5, $6)',
        [name, last, buy, sell, volume, base_unit]
      );
    }

    client.release();

    console.log('API data stored successfully in PostgreSQL.');
  } catch (error) {
    console.error('Error fetching and storing API data:', error);
  }
}

module.exports = { fetchAndStoreAPIData };
