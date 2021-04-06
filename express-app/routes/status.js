const express = require('express');
const statusRouter = express.Router();
const {
  getRegColor,
  getRegSlot,
  getSlotColor,
} = require('../controllers/status');

statusRouter.get('/registration_numbers_for_cars_with_colour', getRegColor);
statusRouter.get('/slot_numbers_for_cars_with_colour', getSlotColor);
statusRouter.get('/slot_number_for_registration_number', getRegSlot);

module.exports = statusRouter;
