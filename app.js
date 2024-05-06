const express = require('express');
const auth = require('./routes/auth');
const posts = require('./routes/posts');
const connectDB = require('./config/db');
require('dotenv').config();
const port = process.env.PORT;
const app = express();
connectDB();

//allowing router to use .json();
app.use(express.json());

//routing to Auth/Posts router
app.use('/auth', auth);
app.use('/posts', posts);

//homepage
app.get('/', (req, res) => {
  // res.send("<h1>Welcome to the home page<h1>")
  res.sendFile(__dirname + '/home.html');
});

//app is listening on port
app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
