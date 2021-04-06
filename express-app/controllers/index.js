const Car = require('../models/car');
const Parking = require('../models/parking');
const slot = require('../models/slot');
let Slots = require('../models/slot');

const createParkingSlot = (req, res) => {
  const noOfSlots = req.query.number;
  for (let i = 0; i <= noOfSlots; ++i) Slots[i] = 1;
  res.send(`Created a parking lot with ${noOfSlots} slots`);
};

const parkCar = async (req, res) => {
  const slotExists = Slots.indexOf(1);
  if (slotExists == -1) {
    res.send(`Sorry, parking lot is full `);
  } else {
    const carnumber = req.query.carnumber;
    const color = req.query.color;

    const carExists = await Car.find({ carRegNo: carnumber }).then((resp) => {
      return resp.length >= 1 ? true : false;
    });

    if (!carExists) {
      await Car.create({
        carRegNo: carnumber,
        carColor: color,
      });
      const avbl_slot = Slots.indexOf(1) + 1;
      Slots[avbl_slot - 1] = 0;
      await Parking.create({
        carRegNo: carnumber,
        slotNo: avbl_slot,
      });
      res.send(`Allocated Slot no ${avbl_slot}`);
    } else {
      res.send(`Error! Car already parked`);
    }
  }
};

const status = async (req, res) => {
  const parkingStatus = await Parking.find({});
  res.send(parkingStatus);
};

module.exports = { createParkingSlot, parkCar, status };
