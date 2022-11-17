const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ProductoSchema = new Schema ({
    nombre: String,
    descripcion: String,
    stock: Number,
    precio: Number,
    marca: String,
    foto: String
}, {versionKey:false})
module.exports = mongoose.model('productos', ProductoSchema)
