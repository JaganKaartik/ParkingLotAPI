const Car = require('../models/car');
const Parking = require('../models/parking');
let Slots = require('../models/slot');

const createParkingSlot = (req, res) => {
  const noOfSlots = req.query.number;
  for (let i = 0; i <= noOfSlots; ++i) Slots[i] = 1;
  res.send(`Created a parking lot with ${noOfSlots} slots`);
};

const parkCar = async (req, res) => {
  const carnumber = req.query.carnumber;
  const color = req.query.color;
  await Car.create({ carRegNo: carnumber, carColor: color });
  const avbl_slot = Slots.indexOf(1) + 1;
  Slots[avbl_slot - 1] = 0;
  await Parking.create({
    carRegNo: carnumber,
    slotNo: avbl_slot,
  });
  res.send(`Allocated Slot no ${avbl_slot}`);
};

module.exports = { createParkingSlot, parkCar };
