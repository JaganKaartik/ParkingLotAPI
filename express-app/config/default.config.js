require('dotenv').config();

const { PORT_TEST, PORT_MAIN, MONGO_URL, MONGO_URL_TEST } = process.env;

const MONGO_DB_URL =
  process.env.NODE_ENV === 'test' ? MONGO_URL_TEST : MONGO_URL;

const PORT = process.env.NODE_ENV === 'test' ? PORT_TEST : PORT_MAIN;

module.exports = { PORT, MONGO_DB_URL };
