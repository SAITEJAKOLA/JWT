const { check } = require('express-validator');

//validations for email and password.
const emailValidation = check(
  'email',
  'Please provide an valid email!!'
).isEmail();
const passwordValidation = check(
  'password',
  'Please provide a password with length greater than 6!!'
).isLength({ min: 6, max: 16 });

module.exports = {
  emailValidation,
  passwordValidation,
};
