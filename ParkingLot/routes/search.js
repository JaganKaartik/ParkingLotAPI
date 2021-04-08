const express = require('express');
const searchRouter = express.Router();
const {
  getRegColor,
  getRegSlot,
  getSlotColor,
  getParkingStatus,
} = require('../controllers/search');

searchRouter.get('/registration_numbers_for_cars_with_colour', getRegColor);
searchRouter.get('/slot_numbers_for_cars_with_colour', getSlotColor);
searchRouter.get('/slot_number_for_registration_number', getRegSlot);
searchRouter.get('/status', getParkingStatus);

module.exports = searchRouter;
