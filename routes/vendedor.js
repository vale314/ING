const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth_Vendedor = require('../middleware/auth-Ven');
const { check, validationResult } = require('express-validator');

const Vendedor = require('../models/Vendedor');
const Funcion = require('../models/funcion');
const Movie = require('../models/Peliculas');
const Venta_Boletos = require('../models/Ventas_Boletos');


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

// @route     GET api/user/allf
// @desc      Obtener Todos users
// @access    Private
router.get('/allf', auth_Vendedor, async (req, res) => {
  try {
    const users = await Funcion.find().sort({
      date: -1
    });
    return res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     POST api/admin/searchd
// @desc      Ingresar Un Dulce
// @access    Public
router.post(
  '/searchm',
  [
    check('name', 'Porfavor Ingrese Un Name Valido').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { name } = req.body;

    let user = await Movie.findOne({ name });

    if (!user) {
        return res.status(400).json({ msg: 'Incorrecto No Encontrado' });
      }
      res.json(user);
  }
);

// @route     POST api/admin/signupd
// @desc      Registrar Un Dulce
// @access    Public
router.post(
  '/addb',
  [
    check('pelicula_name', 'PorFavor Ingrese Un Nombre').not().isEmpty(),
    check('precio', 'PorFavor Ingrese La Precio').not().isEmpty(),
    check('precioT', 'Porfavor Ingrese Un Precio Valido').not().isEmpty(),
    check('pelicula_id','Porfavor Ingrese La Pelicula_id').not().isEmpty(),
    check('sala_num','Porfavor Ingrese Una Sala_num').not().isEmpty(),
    check('horario','Porfavor Ingrese Una Horario').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { 
        pelicula_name,
        pelicula_id, 
        horario, 
        sala_num, 
        precio, 
        cantidad, 
        precioT,
        _id
      } = req.body;

    try {
      let user = await Funcion.findById(_id);

      if (user && user.boletos < cantidad) {
        return res.status(400).json({ msg: 'No Hay Cantidad De Boletos Deseada' });
      }
      
      let funcion = await Funcion.findByIdAndUpdate({_id: _id}, {boletos: user.boletos - cantidad })

      user = new Venta_Boletos({
        pelicula_name,
        pelicula_id,
        horario,
        sala_num,
        precio,
        cantidad,
        precioT
      });

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