const mongoose = require('mongoose');
const { Schema } = mongoose;

const parkingSlotSchema = new Schema({
  carRegNo: String,
  slotNo: String,
});

module.exports = mongoose.model('slot', parkingSlotSchema);
