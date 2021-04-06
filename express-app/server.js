const express = require('express');
const { connectDB } = require('./config/database.config');
const { PORT } = require('./config/default.config');
const { Middleware } = require('./middlewares');

const app = express();

connectDB();
const port = PORT || 6000;
app.use(Middleware);

module.exports = app.listen(port, () => {
  console.log('Server Started Successfully!');
});
