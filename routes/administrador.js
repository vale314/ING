const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth_Admin = require('../middleware/auth-Admin');
const { check, validationResult } = require('express-validator');

const Admin = require('../models/Administrador');
const Vendedor = require('../models/Vendedor');
const User = require('../models/User');



// @route     GET api/admin
// @desc      Obtener Tu User
// @access    Private
router.get('/', auth_Admin, async (req, res) => {
  try {
    const user = await Admin.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route     GET admin/admins
// @desc      Obtener Todos admins
// @access    Private
router.get('/all', auth_Admin, async (req, res) => {
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
router.put('/:id', auth_Admin, async (req, res) => {
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
router.delete('/:id', auth_Admin, async (req, res) => {
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


// @route     POST api/admin/signupv
// @desc      Registrar Un Vendedor
// @access    Public
router.post(
  '/signupv',
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
      let user = await Vendedor.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: 'El Usuario Ya Existe' });
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

// @route     POST api/admin
// @desc      Ingresar En Login
// @access    Public
router.post(
  '/searchv',
  [
    check('email', 'Porfavor Ingrese Un Email Valido').isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { email } = req.body;

    let user = await Vendedor.findOne({ email }).select('-password');;

      if (!user) {
        return res.status(400).json({ msg: 'Incorrecto No Encontrado' });
      }
      res.json(user);
  }
);

// @route     PUT api/vendedor/:id
// @desc      Actualizar Vendedor
// @access    Private
router.post('/updatev', auth_Admin, async (req, res) => {
  const { name, email, phone, id } = req.body;


  const vendedorFields = {};
  if (name) vendedorFields.name = name;
  if (email) vendedorFields.email = email;
  if (phone) vendedorFields.phone = phone;

  try {

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json({ msg: 'Error En Id' });
    }

    let contact = await Vendedor.findById(id);
    
    if (!contact) return res.status(404).json({ msg: 'Vendedor No Encontrado' });

    contact = await Vendedor.findByIdAndUpdate(
      id,
      { $set: vendedorFields },
      { new: true }
    );

    res.json(contact);
  } catch (err) {
    console.error(er.message);
    res.status(500).send('Server Error');
  }
});

// @route     GET api/vendedor
// @desc      Obtener Todos vendedores
// @access    Private
router.get('/allv', auth_Admin, async (req, res) => {
  try {
    const users = await Vendedor.find().sort({
      date: -1
    });
    return res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route     DELETE api/admin/deletev
// @desc      Borrar vendedor
// @access    Private
router.post('/deletev', auth_Admin, async (req, res) => {
  try {
    const { id } = req.body;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json({ msg: 'Error En Id' });
    }

    let contact = await Vendedor.findById(id);

    if (!contact) return res.status(404).json({ msg: 'Vendedor No Encontrado' });

    await Vendedor.findByIdAndRemove(id);

    res.json({ msg: 'Vendedor Eliminado' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     POST api/admin
// @desc      Registrar Admin
// @access    Public
router.post(
  '/signuu',
  [
    check('name', 'PorFavor Ingrese Un Nombre').not().isEmpty(),
    check('type', 'PorFavor Ingrese Un Tipo').not().isEmpty(),
    check('email', 'Porfavor Ingrese Un Email Valido').isEmail(),
    check('phone','Porfavor Ingrese Un Numero Valido').isLength({min:10}),
    check('password','Porfavor Ingrese Una Contraseña Valida').isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, password, type } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: 'El Usuario Ya Existe' });
      }

      user = new User({
        name,
        email,
        phone,
        type,
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


// @route     POST api/admin/signupv
// @desc      Registrar Un Vendedor
// @access    Public
router.post(
  '/signupu',
  [
    check('name', 'PorFavor Ingrese Un Nombre').not().isEmpty(),
    check('type', 'PorFavor Ingrese Un Tipo').not().isEmpty(),
    check('email', 'Porfavor Ingrese Un Email Valido').isEmail(),
    check('phone','Porfavor Ingrese Un Numero Valido').isLength({min:10}),
    check('password','Porfavor Ingrese Una Contraseña Valida').isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, password, type } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: 'El Usuario Ya Existe' });
      }

      user = new User({
        name,
        email,
        phone,
        type,
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

// @route     POST api/admin
// @desc      Ingresar En Login
// @access    Public
router.post(
  '/searchu',
  [
    check('email', 'Porfavor Ingrese Un Email Valido').isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { email } = req.body;

    let user = await User.findOne({ email }).select('-password');;

      if (!user) {
        return res.status(400).json({ msg: 'Incorrecto No Encontrado' });
      }
      res.json(user);
  }
);

// @route     PUT api/vendedor/:id
// @desc      Actualizar Vendedor
// @access    Private
router.post('/updateu', auth_Admin, async (req, res) => {
  const { name, email, phone, id, type } = req.body;


  const userFields = {};
  if (name) userFields.name = name;
  if (email) userFields.email = email;
  if (phone) userFields.phone = phone;
  if (type) userFields.type = type;

  try {

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json({ msg: 'Error En Id' });
    }

    let contact = await User.findById(id);
    
    if (!contact) return res.status(404).json({ msg: 'User No Encontrado' });

    contact = await User.findByIdAndUpdate(
      id,
      { $set: userFields },
      { new: true }
    );

    res.json(contact);
  } catch (err) {
    console.error(er.message);
    res.status(500).send('Server Error');
  }
});

// @route     GET api/vendedor
// @desc      Obtener Todos vendedores
// @access    Private
router.get('/allu', auth_Admin, async (req, res) => {
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


// @route     DELETE api/admin/deletev
// @desc      Borrar vendedor
// @access    Private
router.post('/deleteu', auth_Admin, async (req, res) => {
  try {
    const { id } = req.body;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json({ msg: 'Error En Id' });
    }

    let contact = await User.findById(id);

    if (!contact) return res.status(404).json({ msg: 'Usuario No Encontrado' });

    await User.findByIdAndRemove(id);

    res.json({ msg: 'Usuario Eliminado' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});




module.exports = router;