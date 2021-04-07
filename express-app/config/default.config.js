require('dotenv').config();

const { PORT, MONGO_URL, MONGO_URL_TEST } = process.env;

const MONGO_DB_URL =
  process.env.NODE_ENV === 'test' ? MONGO_URL_TEST : MONGO_URL;

module.exports = { PORT, MONGO_DB_URL };
