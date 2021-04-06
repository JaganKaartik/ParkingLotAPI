const Car = require('../models/car');
const Parking = require('../models/parking');

const getRegColor = async (req, res) => {
  const color = req.query.color;

  // Fetch Array of Registration Numbers with queried color
  const result = await Car.find({ carColor: color }).then((resp) => {
    if (resp.length >= 1) {
      return resp.map((a) => a.carRegNo);
    } else {
      return -1;
    }
  });
  if (result !== -1) {
    res.status(200).send(result);
  } else {
    res.status(404).send(`Sorry, Cars with color ${color} not in parking list`);
  }
};

const getSlotColor = async (req, res) => {
  const color = req.query.color;

  // Fetch All Car Registration Numbers of particular (query) car color from Car Details List
  const result = await Car.find({ carColor: color }).then((resp) => {
    if (resp.length >= 1) {
      return resp.map((a) => a.carRegNo);
    } else {
      return -1;
    }
  });

  // If Result Array exists
  if (result !== -1) {
    // Fetch All Slot Numbers of a list of Car Registration Numbers from Parking Details List
    const data = await Parking.find({ carRegNo: { $in: result } }).then(
      (resp) => {
        if (resp.length >= 1) {
          return resp.map((a) => a.slotNo);
        } else {
          return -1;
        }
      }
    );

    // If Slot Numbers data exists
    if (data !== -1) {
      res.status(200).send(data);
    } else {
      // If Slot Numbers doesn't exist
      res
        .status(404)
        .send(`Sorry, Cars with color ${color} not in parking list`);
    }
  } else {
    // If Result Array doesn't exist
    res.status(404).send(`Sorry, Cars with color ${color} not in parking list`);
  }
};

const getRegSlot = async (req, res) => {
  const regno = req.query.regno;

  // Fetch Slot No of a particular registration number from Parking Details List
  const result = await Parking.find({ carRegNo: regno }).then((resp) => {
    if (resp.length >= 1) {
      return resp[0].slotNo;
    } else {
      return -1;
    }
  });

  // If Result exists
  if (result !== -1) {
    res.send(result);
  } else {
    // If Result doesn't exist
    res.send(
      `Sorry, Cars with Registration Number ${regno} not in parking list`
    );
  }
};

const getParkingStatus = async (req, res) => {
  //Fetch List of all Cars Registration Numbers and  List of all corressponding Car Colors an a object.

  const allCarsInfo = await Car.find().then((resp) => {
    if (resp.length >= 1) {
      let carsArray = [];
      resp.map((a) => {
        let obj = {};
        obj.carRegNo = a.carRegNo;
        obj.carColor = a.carColor;
        carsArray.push(obj);
      });
      return carsArray;
    }
  });

  console.log(allCarsInfo);
  //Fetch List of all Slot Numbers
  const allSlots = await Parking.find({
    carRegNo: { $in: allCarsInfo.carRegNo },
  }).then((resp) => {
    if (resp.length >= 1) {
      return resp.map((a) => a.slotNo);
    }
  });

  console.log(allSlots);
  //Adding All Car Slots Array to All Cars Info Object
  allCarsInfo.allSlots = [...allSlots];

  console.log('Slot No. Registration No. Colour');
  for (i = 0; i < allSlots.length; ++i) {
    console.log(
      `${allCarsInfo.allSlots[i]} ${allCarsInfo.allRegNo[i]} ${allCarsInfo.allColorList[i]} `
    );
  }

  res.send(
    allCarsInfo
      .map(
        (a) =>
          `<h1>Slot No. Registration No. Colour</h1>
          <h1>${a.allSlots}</h1><br>
      <h5>${a.allRegNo}</h5>
      <h5>${a.allColorList}</h5>
      `
      )
      .join('')
  );
};

module.exports = { getRegColor, getRegSlot, getSlotColor, getParkingStatus };
