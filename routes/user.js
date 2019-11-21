const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Movie = require('../models/Peliculas');



// @route     GET api/user
// @desc      Obtener Tu User
// @access    Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route     GET api/user/all
// @desc      Obtener Todos users
// @access    Private
router.get('/all', auth, async (req, res) => {
  try {
    const users = await User.find().sort({
      date: -1
    });
    return res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     PUT api/user/:id
// @desc      Actualizar User
// @access    Private
router.put('/:id', auth, async (req, res) => {
  const { name, email, phone, type, password } = req.body;

  const userFields = {};
  if (name) userFields.name = name;
  if (email) userFields.email = email;
  if (phone) userFields.phone = phone;
  if (type) userFields.type = type;

  try {

    const id = req.params.id;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json({ msg: 'Error En Id' });
    }

    let contact = await User.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: 'User No Encontrado' });

    contact = await User.findByIdAndUpdate(
      req.params.id,
      { $set: userFields },
      { new: true }
    );

    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     DELETE api/user/:id
// @desc      Borrar user
// @access    Private
router.delete('/:id', auth, async (req, res) => {
  try {

    const id = req.params.id;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json({ msg: 'Error En Id' });
    }
    
    let contact = await User.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: 'User No Encontrado' });

    await User.findByIdAndRemove(req.params.id);

    res.json({ msg: 'User Eliminado' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route     POST api/auth Ingresar LOGIN
// @desc      Auth user & get token
// @access    Public
router.post(
  '/login',
  [
    check('email', 'PorFavor Ingrese Un Email Valido').isEmail(),
    check('password', 'Contraseña Es Invalida').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

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

// @route     POST api/users
// @desc      Regiter a user
// @access    Public
router.post(
  '/signup',
  [
    check('name', 'Porfavor Ingrese Un Nombre').not().isEmpty(),
    check('email', 'PorFavor Ingrese Un Email Valido').isEmail(),
    check('phone','PorFavor Ingrese Un Telefono Valido').isLength({min:10}),
    check('password','PorFavor Ingrese Una Contraseña Valida').isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: 'El Usuario Ya Existe' });
      }

      user = new User({
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

// @route     GET api/admin/alld
// @desc      Obtener Todos Dulces
// @access    Private
router.get('/allm', auth, async (req, res) => {
  try {
    const users = await Movie.find().sort({
      date: -1
    });
    return res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;