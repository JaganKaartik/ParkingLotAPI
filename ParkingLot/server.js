const express = require('express');
const { connectDB } = require('./config/database.config');
const { Middleware } = require('./middlewares');

const app = express();

connectDB();
app.use(Middleware);

module.exports = app;
