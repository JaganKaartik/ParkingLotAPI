const Car = require('../models/car');
const Parking = require('../models/parking');

const getRegColor = async (req, res) => {
  const color = req.query.color;
  const result = await Car.find({ carColor: color }).then((resp) => {
    if (resp.length >= 1) {
      return resp.map((a) => a.carRegNo);
    } else {
      return -1;
    }
  });
  if (result !== -1) {
    res.send(result);
  } else {
    res.send(`Sorry, Cars with color ${color} not in parking list`);
  }
};
const getRegSlot = async (req, res) => {};
const getSlotColor = async (req, res) => {};

module.exports = { getRegColor, getRegSlot, getSlotColor };
