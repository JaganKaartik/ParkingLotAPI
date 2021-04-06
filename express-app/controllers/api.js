const Car = require('../models/car');
const Parking = require('../models/parking');
let Slots = require('../models/slot');

const createParkingSlot = (req, res) => {
  const noOfSlots = req.query.number;
  for (let i = 0; i < noOfSlots; ++i) Slots[i] = 1;
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
      const avbl_slot = Slots.indexOf(1);
      Slots[avbl_slot] = 0;
      await Parking.create({
        carRegNo: carnumber,
        slotNo: avbl_slot + 1,
      });
      console.log(`Status of Slots : ${Slots}`);
      res.send(`Allocated Slot no ${avbl_slot + 1}`);
    } else {
      res.send(`Error! Car already parked`);
    }
  }
};

const exitCarPark = async (req, res) => {
  const exitSlot = req.query.slot;
  const carReg = await Parking.find({ slotNo: exitSlot }).then((resp) => {
    if (resp.length != 0) {
      return resp[0].carRegNo;
    } else {
      res.send('Slot Incorrect');
    }
  });
  console.log(carReg);
  await Parking.deleteOne({ slotNo: exitSlot });
  await Car.deleteOne({ carRegNo: carReg });
  Slots[exitSlot - 1] = 1;
  console.log(`Status of Slots : ${Slots}`);
  res.send(`Slot number ${exitSlot} is free.`);
};

module.exports = { createParkingSlot, parkCar, exitCarPark };
