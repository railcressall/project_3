const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'WeatherAPI',
  password: 'your pass goes here',
  port: 5432, 
});

async function runQueries() {
    try {
      await client.connect();
      console.log('Connected to PostgreSQL database');
  
      const lat = await client.query('SELECT latitude FROM weather_aqi');
      console.log('latitudes:', lat.rows);
  
      const lng = await client.query('SELECT longitude FROM weather_aqi');
      console.log('longitudes:', lng.rows);
  
    //   const res3 = await client.query('SELECT * FROM salaries');
    //   console.log('Data from salaries:', res3.rows);
    } catch (err) {
      console.error('Error executing query', err.stack);
    } finally {
      await client.end();
      console.log('Disconnected from PostgreSQL database');
    }
  }
  
  runQueries();