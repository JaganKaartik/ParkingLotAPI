const express = require('express');
const Middleware = express();
const { apiRoutes, searchRoutes } = require('../routes');

Middleware.use('/', apiRoutes);
Middleware.use('/', searchRoutes);

module.exports = { Middleware };
