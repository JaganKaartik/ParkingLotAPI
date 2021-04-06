const express = require('express');
const Middleware = express();
const routes = require('../routes');

Middleware.use('/', routes);

module.exports = { Middleware };
