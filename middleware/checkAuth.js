const JWT = require('jsonwebtoken');
require('dotenv').config();

async function checkAuth(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res
      .status(400)
      .json({ sucess: false, errors: [{ message: 'No token found!!' }] });
  }
  try {
    const payload = await JWT.verify(token, process.env.SECRET);
    req.user = payload.email;
    next();
  } catch (error) {
    return res
      .status(400)
      .json({ sucess: false, message: 'Token Invalid', error: error });
  }
}

module.exports = checkAuth;
