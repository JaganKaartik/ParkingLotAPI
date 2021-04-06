const express = require('express');
const router = express.Router();
const { createParkingSlot, parkCar, status } = require('../controllers');

router.get('/create_parking_lot', createParkingSlot);
router.get('/park', parkCar);
router.get('/status', status);
router.get(
  '/registration_numbers_for_cars_with_colour/:color',
  parkingStatusRegistrationColor
);
router.get('/status', status);

module.exports = router;
