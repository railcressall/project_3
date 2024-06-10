const express = require("express");
const router = express.Router();
const { getCoordinatesByDate, getCoordinatesByID } = require('../controller/coordinates')

//get by date
router.get("/api/coordinates", getCoordinatesByDate);
//get by city_id
router.get("/api/coordinates/:id", getCoordinatesByID);

module.exports = router;