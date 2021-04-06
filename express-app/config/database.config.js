const { connect } = require('mongoose');

const { MONGO_URL } = require('./default.config');

const connectDB = async () => {
  try {
    const options = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    };
    await connect(MONGO_URL, options);
    console.log('MongoDB Successfully Connected');
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = { connectDB };
