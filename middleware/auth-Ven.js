const jwt = require('jsonwebtoken');
const config = require('config');
const Ven = require('../models/Vendedor');

module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header('tokenVendedor');

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No Token, No Autorizado, Es Denegado' });
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.user = decoded.user;

    Ven.findById(req.user.id,(err,resV)=>{
      
      if (!resV) return res.status(404).json({ msg: 'Token No Es Valido' });

    });

    next();

  } catch (err) {
    res.status(401).json({ msg: 'Token No Es Valido' });
  }
};