const pool = require('../db/db')


const getCoordinatesByDate = async (req, res) => {

    const year = req.query.year;
    const month = req.query.month;
    const day = req.query.day;

    const query = `SELECT city_id, city_name, longitude, latitude FROM weather_aqi WHERE "Date" = '${year}-${month}-${day} 07:00:00'`;
    try {
        const result = await pool.query(query);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Error executing query:", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

const getCoordinatesByID = async (req, res) => {

    const city_id = req.params.id;

    const query = `SELECT * FROM weather_aqi WHERE city_id = ${city_id}`;
    try {
        const result = await pool.query(query);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Error executing query:", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}



module.exports = { getCoordinatesByDate, getCoordinatesByID }