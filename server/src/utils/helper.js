const CONFIG = require('../config/config').jwt;
const jwt = require('jsonwebtoken');

function generateToken(payLoad) {
  const secret = CONFIG.secret;
  const expiresIn = CONFIG.expiresIn;

  return jwt.sign({ payLoad }, secret, { expiresIn });
}

module.exports = generateToken;
