const express = require('express');
const { Client } = require('pg');
const path = require('path');

const app = express();
const port = 3000;

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'WeatherAPI',
  password: 'Soundcloud98',
  port: 5432,
});

// Connect to PostgreSQL database
client.connect()
  .then(() => console.log('Connected to PostgreSQL database'))
  .catch(err => console.error('Error connecting to PostgreSQL database', err.stack));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to fetch coordinates
app.get('/api/coordinates', async (req, res) => {
  try {
    const result = await client.query('SELECT latitude, longitude FROM weather_aqi');
    res.json(result.rows);
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).send('Server error');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}/`);
});

console.log("hello")