const express = require('express');
const statusRouter = express.Router();
const {
  getRegColor,
  getRegSlot,
  getSlotColor,
} = require('../controllers/status');

statusRouter.get('/registration_numbers_for_cars_with_colour', getRegColor);

module.exports = statusRouter;
