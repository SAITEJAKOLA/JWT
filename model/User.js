const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
    required: [true, 'Please provide the email'],
  },
  password: { type: String, select: false },
  createdttm: {
    type: Date,
    default: Date.now(),
  },
});

//export the model as mongoose.model('modelname', schema)
module.exports = mongoose.model('User', UserSchema);
