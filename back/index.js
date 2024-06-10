const express = require("express");
const cors = require("cors");
const app = express()
const dotenv = require('dotenv');
const coordinates = require('./routes/coordinates')
const { createWeatherAQITable, importCsvToDb} = require('./db/schema');


dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(coordinates)


app.listen(process.env.EXPRESS_PORT, async () => {
    await createWeatherAQITable();
    await importCsvToDb();
    console.log("Server listening on port " + process.env.EXPRESS_PORT);
});