const mongoose = require('mongoose');
const { Schema } = mongoose;

const parkingSchema = new Schema({
  carRegNo: String,
  carColor: String,
});

module.exports = mongoose.model('parking', parkingSchema);
