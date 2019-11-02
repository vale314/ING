const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const Vendedor = require('../models/Vendedor');

// @route     POST api/vendedor
// @desc      Ingresar Con Login
// @access    Public
router.post(
  '/login',
  [
    check('email', 'PorFavor Ingrese Un Email Valido').isEmail(),
    check('password', 'Password Es Requerida').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await Vendedor.findOne({ email });

      if (!user) {
        return res.status(400).json({ msg: 'No Es Correcto' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: 'No Es Correcto' });
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route     POST api/vendedor
// @desc      Registrar Un Vendedor
// @access    Public
router.post(
  '/signup',
  [
    check('name', 'Porfavor Ingresa Un Nombre').not().isEmpty(),
    check('email', 'Porfavor Ingresa Un Email Valido').isEmail(),
    check('phone','Porfavor Ingresa Un Numero Telefonico').isLength({min:10}),
    check('password','Porfavor Ingresa Un Password De Mas De 6 Caracteres').isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, password } = req.body;

    try {
      let user = await Vendedor.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: 'Usuario Ya Existe' });
      }

      user = new Vendedor({
        name,
        email,
        phone,
        password
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;