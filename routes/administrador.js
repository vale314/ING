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
const Dulce = require('../models/Dulce');
const Movie = require('../models/Peliculas');
const Funcion = require('../models/funcion');



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



// @route     POST api/admin/signupd
// @desc      Registrar Un Dulce
// @access    Public
router.post(
  '/signupd',
  [
    check('name', 'PorFavor Ingrese Un Nombre').not().isEmpty(),
    check('cantidad', 'PorFavor Ingrese La Cantidad').isLength({min:1}),
    check('precio', 'Porfavor Ingrese Un Precio Valido').isLength({min:1}),
    check('categoria','Porfavor Ingrese La Categoria Valida').not().isEmpty(),
    check('idD','Porfavor Ingrese Una Id Valida').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, cantidad, precio, categoria, idD } = req.body;

    try {
      let user = await Dulce.findOne({ idD });

      if (user) {
        return res.status(400).json({ msg: 'El Dulce Ya Existe' });
      }

      user = new Dulce({
        name,
        cantidad,
        precio,
        categoria,
        idD
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

// @route     POST api/admin/searchd
// @desc      Ingresar Un Dulce
// @access    Public
router.post(
  '/searchd',
  [
    check('idD', 'Porfavor Ingrese Un IDD Valido').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { idD } = req.body;

    let user = await Dulce.findOne({ idD });

    if (!user) {
        return res.status(400).json({ msg: 'Incorrecto No Encontrado' });
      }
      res.json(user);
  }
);

// @route     PUT api/admin/updated
// @desc      Actualizar Dulce
// @access    Private
router.post('/updated', auth_Admin, async (req, res) => {
  const { name, cantidad, precio, categoria, id, idD } = req.body;


  const dulceFields = {};
  if (name) dulceFields.name = name;
  if (cantidad) dulceFields.cantidad = cantidad;
  if (precio) dulceFields.precio = precio;
  if (categoria) dulceFields.categoria = categoria;
  if (idD) dulceFields.idD = idD;

  try {

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json({ msg: 'Error En Id' });
    }

    let contact = await Dulce.findById(id);
    
    if (!contact) return res.status(404).json({ msg: 'Dulce No Encontrado' });

    contact = await Dulce.findByIdAndUpdate(
      id,
      { $set: dulceFields },
      { new: true }
    );

    res.json(contact);
  } catch (err) {
    console.error(er.message);
    res.status(500).send('Server Error');
  }
});

// @route     GET api/admin/alld
// @desc      Obtener Todos Dulces
// @access    Private
router.get('/alld', auth_Admin, async (req, res) => {
  try {
    const users = await Dulce.find().sort({
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
router.post('/deleted', auth_Admin, async (req, res) => {
  try {
    const { id } = req.body;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json({ msg: 'Error En Id' });
    }

    let contact = await Dulce.findById(id);

    if (!contact) return res.status(404).json({ msg: 'Dulce No Encontrado' });

    await Dulce.findByIdAndRemove(id);

    res.json({ msg: 'Dulce Eliminado' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route     POST api/admin/signupa
// @desc      Registrar Un Admin
// @access    Public
router.post(
  '/signupa',
  [
    check('name', 'PorFavor Ingrese Un Nombre').not().isEmpty(),
    check('email', 'Porfavor Ingrese Un Email Valido').isEmail(),
    check('password','Porfavor Ingrese Una Contraseña Valida').isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await Admin.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: 'El Usuario Ya Existe' });
      }

      user = new Admin({
        name,
        email,
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
  '/searcha',
  [
    check('email', 'Porfavor Ingrese Un Email Valido').isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { email } = req.body;

    let user = await Admin.findOne({ email }).select('-password');;

      if (!user) {
        return res.status(400).json({ msg: 'Incorrecto No Encontrado' });
      }
      res.json(user);
  }
);

// @route     PUT api/vendedor/:id
// @desc      Actualizar Vendedor
// @access    Private
router.post('/updatea', auth_Admin, async (req, res) => {
  const { name, email, id } = req.body;


  const userFields = {};
  if (name) userFields.name = name;
  if (email) userFields.email = email;

  try {

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json({ msg: 'Error En Id' });
    }

    let contact = await Admin.findById(id);
    
    if (!contact) return res.status(404).json({ msg: 'Admin No Encontrado' });

    contact = await Admin.findByIdAndUpdate(
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
router.get('/alla', auth_Admin, async (req, res) => {
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


// @route     DELETE api/admin/deletev
// @desc      Borrar vendedor
// @access    Private
router.post('/deletea', auth_Admin, async (req, res) => {
  try {
    const { id } = req.body;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json({ msg: 'Error En Id' });
    }

    let contact = await Admin.findById(id);

    if (!contact) return res.status(404).json({ msg: 'Admin No Encontrado' });

    await Admin.findByIdAndRemove(id);

    res.json({ msg: 'Admin Eliminado' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     POST api/admin/signupd
// @desc      Registrar Un Dulce
// @access    Public
router.post(
  '/signupm',
  [
    check('name', 'PorFavor Ingrese Un Nombre').not().isEmpty(),
    check('foto', 'PorFavor Ingrese Una Foto').not().isEmpty(),
    check('trailer', 'Porfavor Ingrese Un Trailer').not().isEmpty(),
    check('duracion','Porfavor Ingrese La Duracion Valida').not().isEmpty(),
    check('sinapsis','Porfavor Ingrese Una Sinapsis Valida').not().isEmpty(),
    check('director','Porfavor Ingrese El Director Original').not().isEmpty(),
    check('categoria','Porfavor Ingrese La Categoria').not().isEmpty(),
    check('ano','Porfavor Ingrese La Duracion Fecha').not().isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, foto, trailer, duracion, sinapsis, director, categoria, ano } = req.body;

    try {
      let user = await Movie.findOne({ name });

      if (user) {
        return res.status(400).json({ msg: 'La Pelicula Ya Existe' });
      }

      user = new Movie({
        name,
        foto,
        trailer,
        duracion,
        sinapsis,
        director,
        categoria,
        ano
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

// @route     PUT api/admin/updated
// @desc      Actualizar Dulce
// @access    Private
router.post('/updatem', auth_Admin, async (req, res) => {
  const { name, foto, trailer, duracion, sinapsis, director, categoria, ano, id } = req.body;


  const movieField = {};
  if (name) movieField.name = name;
  if (foto) movieField.foto = foto;
  if (trailer) movieField.trailer = trailer;
  if (duracion) movieField.duracion = duracion;
  if (sinapsis) movieField.sinapsis = sinapsis;
  if (director) movieField.director = director;
  if (categoria) movieField.categoria = categoria;
  if (ano) movieField.ano = ano;

  try {

    if(!id) return res.status(400).json({msg: 'Error En KEY'})
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json({ msg: 'Error En Id' });
    }

    let contact = await Movie.findById(id);
    
    if (!contact) return res.status(404).json({ msg: 'Movie No Encontrada' });

    contact = await Movie.findByIdAndUpdate(
      id,
      { $set: movieField },
      { new: true }
    );

    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     GET api/admin/alld
// @desc      Obtener Todos Dulces
// @access    Private
router.get('/allm', auth_Admin, async (req, res) => {
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


// @route     DELETE api/admin/deletev
// @desc      Borrar vendedor
// @access    Private
router.post('/deletem', auth_Admin, async (req, res) => {
  try {
    const { id } = req.body;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json({ msg: 'Error En Id' });
    }

    let contact = await Movie.findById(id);

    if (!contact) return res.status(404).json({ msg: 'Movie No Encontrado' });

    await Movie.findByIdAndRemove(id);

    res.json({ msg: 'Movie Eliminado' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route     POST api/admin/signupf
// @desc      Registrar Un Funcion
// @access    Public
router.post(
  '/signupf',
  [
    check('pelicula_name', 'PorFavor Ingrese Un Nombre').not().isEmpty(),
    check('horario', 'PorFavor Ingrese Un Horario').not().isEmpty(),
    check('sala_num', 'Porfavor Ingrese Una Sala').not().isEmpty(),
    check('precio','Porfavor Ingrese Un Precio').not().isEmpty(),
    check('pelicula_id','Porfavor Ingrese Un ID').not().isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { pelicula_name, horario, sala_num, precio, pelicula_id } = req.body;

    try {
      let user = await Funcion.findOne({ "$and": [{
              "sala_num": sala_num
          }, {
              "horario": horario
          }] 
      });

      if (user) {
        return res.status(400).json({ msg: 'La Funcion Ya Existe' });
      }
      user = new Funcion({
        pelicula_name,
        precio,
        pelicula_id,
        sala_num,
        horario
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

// @route     GET api/admin/allf
// @desc      Obtener Todos Funciones
// @access    Private
router.get('/allf', auth_Admin, async (req, res) => {
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

// @route     DELETE api/admin/deletev
// @desc      Borrar vendedor
// @access    Private
router.post('/deletef', auth_Admin, async (req, res) => {
  try {
    const { id } = req.body;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json({ msg: 'Error En Id' });
    }

    let contact = await Funcion.findById(id);

    if (!contact) return res.status(404).json({ msg: 'Funcion No Encontrada' });

    await Funcion.findByIdAndRemove(id);

    res.json({ msg: 'Funcion Eliminada' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     POST api/admin
// @desc      Ingresar En Login
// @access    Public
router.post(
  '/searchf',
  [
    check('id', 'Porfavor Ingrese Un ID Valido').isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { id } = req.body;

    let user = await Funcion.findById( id );

      if (!user) {
        return res.status(400).json({ msg: 'Incorrecto No Encontrado' });
      }
      res.json(user);
  }
);
module.exports = router;