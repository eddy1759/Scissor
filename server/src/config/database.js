const mongoose = require('mongoose');
const URI = require('./config').db;

async function dbSetUp() {
  mongoose.set('strictQuery', false);

  mongoose.connect(URI.url);

  mongoose.connection.on('connected', () => {
    console.info('Database connected succesfully');
  });

  mongoose.connection.on('error', (error) => {
    console.info('An error occurred when connecting to database');
    console.error(error);
  });
}
