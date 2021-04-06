const express = require('express');
const { connectDB } = require('./app/config/database.config');
const { PORT } = require('./app/config/default.config');

const app = express();

connectDB();
const port = PORT || 6000;

app.listen(port, () => {
  console.log('Server Started Successfully!');
});
