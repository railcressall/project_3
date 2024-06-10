const pool = require('./db');
const fs = require('fs');
const csv = require('csv-parser');

const filePaths = [
    '../back/data/data2020.csv',
    '../back/data/data2021.csv',
    '../back/data/data2022.csv',
];

const createWeatherAQITable = async () => {
    const query = `
    CREATE TABLE IF NOT EXISTS weather_aqi (
      city_id SERIAL PRIMARY KEY,
      city_name VARCHAR(50) NOT NULL,
      "Date" TIMESTAMP NOT NULL,
      latitude REAL NOT NULL,
      longitude REAL NOT NULL,
      AQI INT NOT NULL,
      CO REAL NOT NULL,
      "NO" REAL NOT NULL,
      NO2 REAL NOT NULL,
      O3 REAL NOT NULL,
      SO2 REAL NOT NULL,
      PM2_5 REAL NOT NULL,
      PM10 REAL NOT NULL,
      NH3 REAL NOT NULL
    );
  `;

    try {
        //create table in DB
        await pool.query(query);
        console.log("Table created successfully");
    } catch (err) {
        console.error("Error creating table", err);
    }
};

const importCsvToDb = async () => {
    try {
        const queryText = `
        INSERT INTO weather_aqi (
          latitude, longitude, "Date", city_name, AQI, CO, "NO", NO2, O3, SO2, PM2_5, PM10, NH3
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      `;

      for (const filePath of filePaths) {
        await new Promise((resolve, reject) => {
            fs.createReadStream(filePath)
                .pipe(csv())
                .on('data', async (row) => {
                    const values = [
                        parseFloat(row.Latitude),
                        parseFloat(row.Longitude),
                        row.Date,
                        row['City Name'],
                        parseInt(row.AQI, 10),
                        parseFloat(row['Carbon monoxide (CO)']),
                        parseFloat(row['Nitric Oxide (NO)']),
                        parseFloat(row['Nitrogen dioxide (NO2)']),
                        parseFloat(row['Ozone (O3)']),
                        parseFloat(row['Sulfur Dioxide (SO2)']),
                        parseFloat(row['Particulates 2.5']),
                        parseFloat(row['Particulates 10']),
                        parseFloat(row['Ammonia (NH3)'])
                    ];
    
                    try {
                        await pool.query(queryText, values);
                    } catch (err) {
                        console.error('Error inserting row:', err);
                    }
                })
                .on('end', () => {
                    console.log(`CSV file ${filePath} successfully processed`);
                    resolve();
                })
                .on('error', (err) => {
                    console.error(`Error processing file ${filePath}:`, err);
                    reject(err);
                });
        });
    }
        console.log('All CSV files successfully processed');
    } catch (err) {
        console.error('Error importing CSV to DB:', err);
    }
};


module.exports = { createWeatherAQITable, importCsvToDb };