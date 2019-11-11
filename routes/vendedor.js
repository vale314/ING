const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth_Vendedor = require('../middleware/auth-Ven');
const { check, validationResult } = require('express-validator');

const Vendedor = require('../models/Vendedor');


// @route     GET api/user
// @desc      Obtener Tu User
// @access    Private
router.get('/', auth_Vendedor, async (req, res) => {
  try {
    const user = await Vendedor.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route     PUT api/vendedor/:id
// @desc      Actualizar Vendedor
// @access    Private
router.put('/:id', auth_Vendedor, async (req, res) => {
  const { name, email, phone, type } = req.body;


  const vendedorFields = {};
  if (name) vendedorFields.name = name;
  if (email) vendedorFields.email = email;
  if (phone) vendedorFields.phone = phone;
  if (type) vendedorFields.type = type;

  try {

    const id = req.params.id;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json({ msg: 'Error En Id' });
    }

    let contact = await Vendedor.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: 'Vendedor No Encontrado' });

    contact = await Vendedor.findByIdAndUpdate(
      req.params.id,
      { $set: vendedorFields },
      { new: true }
    );

    res.json(contact);
  } catch (err) {
    console.error(er.message);
    res.status(500).send('Server Error');
  }
});

// @route     DELETE api/vendedor/:id
// @desc      Borrar vendedor
// @access    Private
router.delete('/:id', auth_Vendedor, async (req, res) => {
  try {
    
    const id = req.params.id;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json({ msg: 'Error En Id' });
    }

    let contact = await Vendedor.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: 'Vendedor No Encontrado' });

    await Vendedor.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Vendedor Eliminado' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


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

module.exports = router;