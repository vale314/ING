const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const Admin = require('../models/Administrador');


// @route     GET admin/admins
// @desc      Obtener Todos admins
// @access    Private
router.get('/all', auth, async (req, res) => {
  try {
    const users = await Admin.find().sort({
      date: -1
    });
    return res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     PUT api/admin/:id
// @desc      Actualizar Admin
// @access    Private
router.put('/:id', auth, async (req, res) => {
  const { name, email, type, password } = req.body;

  const adminFields = {};
  if (name) adminFields.name = name;
  if (email) adminFields.email = email;
  if (type) adminFields.type = type;

  try {
    const id = req.params.id;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json({ msg: 'Error En Id' });
    }
    let contact = await Admin.findById(id);

    if (!contact) return res.status(404).json({ msg: 'Admin No Encontrado' });

    contact = await Admin.findByIdAndUpdate(
      id,
      { $set: adminFields },
      { new: true }
    );

    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     DELETE api/admin/:id
// @desc      Borrar admin
// @access    Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const id = req.params.id;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json({ msg: 'Error En Id' });
    }
    
    let contact = await Admin.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: 'Administrador No Encontrado' });

    await Admin.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Admin Eliminado' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route     POST api/admin
// @desc      Ingresar En Login
// @access    Public
router.post(
  '/login',
  [
    check('email', 'Porfavor Ingrese Un Email Valido').isEmail(),
    check('password', 'Contraseña No Valida').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await Admin.findOne({ email });

      if (!user) {
        return res.status(400).json({ msg: 'Incorrecto' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: 'Incorrecto' });
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

// @route     POST api/admin
// @desc      Registrar Admin
// @access    Public
router.post(
  '/signup',
  [
    check('name', 'PorFavor Ingrese Un Nombre').not().isEmpty(),
    check('email', 'Porfavor Ingrese Un Email Valido').isEmail(),
    check('phone','Porfavor Ingrese Un Numero Valido').isLength({min:10}),
    check('password','Porfavor Ingrese Una Contraseña Valida').isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, password } = req.body;

    try {
      let user = await Admin.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: 'El Usuario Ya Existe' });
      }

      user = new Admin({
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