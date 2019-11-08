const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header('tokenUser');
  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No Token, Autorizacion Denegada' });
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token No Es Valida' });
  }
};