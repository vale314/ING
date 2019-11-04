const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const auth_AV = require('../middleware/auth-AV');
const auth_Admin = require('../middleware/auth-Admin');
const { check, validationResult } = require('express-validator');

const Dulce = require('../models/Dulce');


// @route     GET api/dulce
// @desc      Obtener Todos dulces
// @access    Private
router.get('/all', auth, async (req, res) => {
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

// @route     PUT api/dulce/:id
// @desc      Actualizar Dulce
// @access    Private
router.put('/:id', auth_Admin, async (req, res) => {
  const { name, cantidad, precio, categoria } = req.body;


  const dulceFields = {};
  if (name) dulceFields.name = name;
  if (cantidad) dulceFields.cantidad = cantidad;
  if (precio) dulceFields.precio = precio;
  if (categoria) dulceFields.categoria = categoria;

  try {

    const id = req.params.id;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json({ msg: 'Error En Id' });
    }

    let contact = await Dulce.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: 'Dulce No Encontrado' });

    contact = await Dulce.findByIdAndUpdate(
      req.params.id,
      { $set: dulceFields },
      { new: true }
    );

    res.json(contact);
  } catch (err) {
    console.error(er.message);
    res.status(500).send('Server Error');
  }
});

// @route     DELETE api/dulce/:id
// @desc      Borrar dulce
// @access    Private
router.delete('/:id', auth_Admin, async (req, res) => {
  try {

    const id = req.params.id;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json({ msg: 'Error En Id' });
    }
    
    let contact = await Dulce.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: 'Dulce No Encontrado' });

    await Dulce.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Dulce Alterado' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     POST api/dulce
// @desc      Registrar Dulce
// @access    Private
router.post(
  '/add',
  [
    check('name', 'Porfavor Agregue Un Nombre').not().isEmpty(),
    check('cantidad', 'Porfavor Ingrese Una Cantidad').isLength({min:1}),
    check('precio','Porfavor Ingrese Un Precio').isLength({min:1}),
    check('categoria','Porfavor Ingrese Una Categoria').not().isEmpty(),
  ],
  auth_Admin,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, cantidad, telefono, categoria } = req.body;

    try {
      let dulce = await Dulce.findOne({ name });

      if (dulce) {
        return res.status(400).json({ msg: 'Dulce Ya Existe' });
      }

      dulce = new Dulce({
        name,
        cantidad,
        telefono,
        categoria
      });

      await dulce.save();

      res.status(200).json({
          msg: "Guardado"
      });
  
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;