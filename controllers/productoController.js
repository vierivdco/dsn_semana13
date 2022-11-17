const Producto = require('../model/Producto')
const {uploadToBucket} = require('../s3/s3')


//Mostrar
module.exports.mostrar = (req, res)=>{
    Producto.find({}, (error, productos)=>{
        if(error) {
            return res.status(500).json({
                message: 'Error mostrando los productos'
            })
        }
        return res.render('index', {productos: productos})
    })
}

//Crear 
module.exports.crear = async (req, res)=>{
    try {
        const file = req.files.foto
        const result = await uploadToBucket(file)
        const url = await result.Location
        await saveData(url,req)  
        res.redirect('/') 
    } catch (error) {
       console.log(error) 
    }
    
}

///S3
const saveData = (url_image, req) => {
    const producto = new Producto({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        stock: req.body.stock,
        precio: req.body.precio,
        marca: req.body.marca,
        foto: url_image
    })
    producto.save(function(error,producto){
        if(error){
            return res.status(500).json({
                message: 'Error al crear el Producto'
            })
        }
    })
}


//Editar
module.exports.editar = async(req,res)=>{
    try {
    const id = req.body.id_editar
    const nombre = req.body.nombre_editar
    const descripcion = req.body.descripcion_editar
    const stock = req.body.stock_editar
    const precio = req.body.precio_editar
    const marca = req.body.marca_editar
    const newData = {
        nombre: nombre,
        descripcion: descripcion,
        stock: stock,
        precio: precio,
        marca: marca,
    }
    if (req.files) {
        const file = req.files.foto_editar
        const result = await uploadToBucket(file)
        const url = await result.Location
        newData.foto= url  
    }
    await Producto.findByIdAndUpdate(id, {$set:newData}) 
    res.redirect('/');
    } catch (error) {
       console.log(error) 
    }
    
}

//Borrar
module.exports.borrar = (req, res)=>{
    const id = req.params.id
    Producto.findByIdAndRemove(id, (error, producto)=>{
        if(error){
            return res.status(500).json({
                message: 'Error intentando eliminar Producto'
            })
        }
        res.redirect('/')
    })
}
