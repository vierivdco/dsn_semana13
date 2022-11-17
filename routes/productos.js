const express = require('express')
const router = express.Router()

const productoController = require('../controllers/productoController')

//Mostrar todos los productos(GET)
router.get('/', productoController.mostrar)
//Crear productos(POST)
router.post('/crear', productoController.crear)
//Editar productos(POST)
router.post('/editar', productoController.editar)
//Borrar productos(GET)
router.get('/borrar/:id', productoController.borrar)
module.exports = router