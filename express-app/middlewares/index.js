const express = require('express');
const Middleware = express();
const { apiRoutes, statusRoutes } = require('../routes');

Middleware.use('/', apiRoutes);
Middleware.use('/status', statusRoutes);

module.exports = { Middleware };
