const express = require('express');
const router = express.Router();
const { createParkingSlot, parkCar } = require('../controllers');

router.get('/create_parking_lot', createParkingSlot);
router.get('/park', parkCar);

module.exports = router;
