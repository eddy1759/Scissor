const mongoose = require('mongoose');
const URI = require('./config').db;
const logger = require('./logger');

async function dbSetUp() {
  mongoose.set('strictQuery', false);

  mongoose.connect(URI.url);

  mongoose.connection.on('connected', () => {
    logger.info('Database connected succesfully');
  });

  mongoose.connection.on('error', (error) => {
    logger.info('An error occurred when connecting to database');
    console.error(error);
  });
}
