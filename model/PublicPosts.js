const mongoose = require('mongoose');

const publicPosts = new mongoose.Schema({
  postname: {
    type: String,
  },
  text: {
    type: String,
  },
});

//export the model as mongoose.model('modelname', schema)
module.exports = mongoose.model('publicposts', publicPosts);
