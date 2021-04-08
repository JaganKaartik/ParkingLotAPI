const express = require('express');
const router = express.Router();
const {
  createParkingSlot,
  parkCar,
  exitCarPark,
} = require('../controllers/api');

router.get('/create_parking_lot', createParkingSlot);
router.get('/park', parkCar);
router.get('/leave', exitCarPark);

module.exports = router;
