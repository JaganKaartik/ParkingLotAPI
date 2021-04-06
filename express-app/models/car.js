const mongoose = require('mongoose');
const { Schema } = mongoose;

const carSchema = new Schema({
  carRegNo: String,
  carColor: String,
});

module.exports = mongoose.model('car', carSchema);
