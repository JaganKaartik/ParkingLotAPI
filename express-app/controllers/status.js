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

const getSlotColor = async (req, res) => {
  const color = req.query.color;

  // Fetch Array of Registration Numbers with queried color
  const result = await Car.find({ carColor: color }).then((resp) => {
    if (resp.length >= 1) {
      return resp.map((a) => a.carRegNo);
    } else {
      return -1;
    }
  });

  // If Result Array exists
  if (result !== -1) {
    const data = await Parking.find({ carRegNo: { $in: result } }).then(
      (resp) => {
        if (resp.length >= 1) {
          return resp.map((a) => a.slotNo);
        } else {
          return -1;
        }
      }
    );

    // If Slot Number data exists
    if (data !== -1) {
      res.send(data);
    } else {
      // If Slot Numbers doesn't exist
      res.send(`Sorry, Cars with color ${color} not in parking list`);
    }
  } else {
    // If Result Array doesn't exist
    res.send(`Sorry, Cars with color ${color} not in parking list`);
  }
};

const getRegSlot = async (req, res) => {
  const regno = req.query.regno;
  const result = await Parking.find({ carRegNo: regno }).then((resp) => {
    if (resp.length >= 1) {
      return resp[0].slotNo;
    } else {
      return -1;
    }
  });
  if (result !== -1) {
    res.send(result);
  } else {
    res.send(
      `Sorry, Cars with Registration Number ${regno} not in parking list`
    );
  }
};

module.exports = { getRegColor, getRegSlot, getSlotColor };
