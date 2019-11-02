const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const Dulce = require('../models/Dulce');

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
  auth,
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