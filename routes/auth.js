const router = require('express').Router();
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const {
  emailValidation,
  passwordValidation,
} = require('../middleware/validations');
const User = require('../model/User');
require('dotenv').config();

router.get('/allusers', async (req, res) => {
  try {
    const users = await User.find();
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `couldnt find the users due to ${error}`,
    });
  }
});

//SigngUp Post call
router.post(
  '/signup',
  [emailValidation, passwordValidation],
  async (req, res) => {
    const { email, password } = req.body;
    const username = email.split('@')[0];
    const secret = process.env.SECRET;
    //validated the input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(500)
        .json({ success: false, message: 'Validation Failed', errors: errors });
    }
    //validated if the user doesnt already exist
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        sucess: false,
        errors: [{ message: 'User already exists!!' }],
      });
    }
    //hashed the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    //need to pass the payload & secret and any additional options
    const token = await JWT.sign({ email }, secret, { expiresIn: 36000 });
    console.log(token);
    res.json({ success: true, message: 'Signup compeleted', token: token });
  }
);

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const secret = process.env.SECRET;
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return res.status(400).json({
      sucess: false,
      errors: [{ message: 'Invalid Credentials!!' }],
    });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res
      .status(400)
      .json({ sucess: false, errors: [{ message: 'Invalid Credentials!!' }] });
  }
  const token = await JWT.sign({ email }, secret, { expiresIn: 36000 });
  console.log(token);
  res.json({ success: true, message: 'Login Succesfull!!', token: token });
});

module.exports = router;
