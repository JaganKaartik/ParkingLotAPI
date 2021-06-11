const express = require('express');
const router = express.Router();
const {
  createParkingSlot,
  parkCar,
  exitCarPark,
} = require('../controllers/api');

router.get('/', (req,res)=> {
  res.send("Welcome to Root of Parking Lot: This is a test route");
});
router.get('/create_parking_lot', createParkingSlot);
router.get('/park', parkCar);
router.get('/leave', exitCarPark);

module.exports = router;
