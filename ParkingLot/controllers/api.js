const Car = require('../models/car');
const Parking = require('../models/parking');
let Slots = require('../models/slot');

const createParkingSlot = (req, res) => {
  const noOfSlots = req.query.number;
  if (noOfSlots >= 1) {
    for (let i = 0; i < noOfSlots; ++i) Slots[i] = 1;
    res.status(200).send(`Created a parking lot with ${noOfSlots} slots`);
  } else {
    res.status(400).send('Error! Minimum 1 Parking Slot to be created');
  }
};

const parkCar = async (req, res) => {
  const slotExists = Slots.indexOf(1);
  if (slotExists == -1) {
    res.status(404).send(`Sorry, parking lot is full`);
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
      const avbl_slot = Slots.indexOf(1);
      Slots[avbl_slot] = 0;
      await Parking.create({
        carRegNo: carnumber,
        slotNo: avbl_slot + 1,
      });
      res.status(200).send(`Allocated Slot number: ${avbl_slot + 1}`);
    } else {
      res.status(404).send(`Error! Car already parked`);
    }
  }
};

const exitCarPark = async (req, res) => {
  const exitSlot = req.query.slot;
  const carReg = await Parking.find({ slotNo: exitSlot }).then((resp) => {
    if (resp.length != 0) {
      return resp[0].carRegNo;
    } else {
      return -1;
    }
  });
  if (carReg === -1) {
    res.status(404).send('Slot Incorrect');
  } else {
    await Parking.deleteOne({ slotNo: exitSlot });
    await Car.deleteOne({ carRegNo: carReg });
    Slots[exitSlot - 1] = 1;
    res.status(200).send(`Slot number ${exitSlot} is free.`);
  }
};

module.exports = { createParkingSlot, parkCar, exitCarPark };
