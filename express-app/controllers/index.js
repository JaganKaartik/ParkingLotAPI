const SlotObj = require('../models/slot');
const Car = require('../models/car');
const Parking = require('../models/parking');
const { modelName } = require('../models/car');

const createParkingSlot = (req, res) => {
  const noOfSlots = req.query.number;
  SlotObj.slots = Array(noOfSlots).fill(1);
  res.send(`Created a parking lot with ${noOfSlots} slots`);
};

const parkCar = async (req, res) => {
  const carnumber = req.query.carnumber;
  const color = req.query.color;
  await Car.create({ carRegNo: carnumber, carColor: color });
};

module.exports = { createParkingSlot, parkCar };
