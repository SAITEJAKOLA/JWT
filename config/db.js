const mongoose = require('mongoose');
require('dotenv').config();

const connectdb = async () => {
  try {
    const conc = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Db connection successful with host ${conc.connection.host}`);
  } catch (err) {
    console.log(`DB connection failed due to ${err}`);
  }
};

module.exports = connectdb;
