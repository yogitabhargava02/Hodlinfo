const fetchAndStoreData = async () => {
    try {
      const response = await fetch('https://api.wazirx.com/api/v2/tickers');
      const jsonData = await response.json();
      
      const top10Tickers = jsonData.slice(0, 10); 
      
     
      for (const ticker of top10Tickers) {
        const { name, last, buy, sell, volume, base_unit } = ticker;
        
        // Insert the ticker into the database
        await pool.query(
          'INSERT INTO tickers (name, last, buy, sell, volume, base_unit) VALUES ($1, $2, $3, $4, $5, $6)',
          [name, last, buy, sell, volume, base_unit]
        );
      }
      
      console.log('Data stored successfully!');
    } catch (error) {
      console.error('Error fetching and storing data:', error);
    }
  };
  