const productModel = require('../models/products');
const DB = require('../database/models');
/* const stock = require('../database/models/stock');  */

const controllers = {

    // get /products/Sebas
    getProducts: async (req, res) => {

        /* se asigna que busque todos los datos desde la tabla Stock */
        const Stock = await DB.Stock.findAll()

        /* const productos = productModel.findAll(); */
        /* Mostramos en la vista todos los productos de la tabla Stock */
        const productos = await DB.Stock.findAll()
        res.render('listProducts', {
            title: 'Lista de productos',
            productos
        });

    },
   //get/Create/Sebas
   
    getCreate: async (req, res) => {
        const nuevoProducto = {
            nombre: req.body.nombre,
            categoria: req.body.categoria,
            descripcion: req.body.descripcion,
            cantidad: req.body.cantidad,
            precio: req.body.precio
        };

        try {
            const datos = await productModel.create(nuevoProducto);
            console.log(datos);
        } catch (error) {
            console.log(error);
        }

        res.send('Producto creado con exito');
        },
    
    

    
    deleteProducts: (req, res) => {
        const id = Number(req.params.id);
    
        productModel.deleteById(id);
    
        res.redirect('/products');
      },

    // get /productscard/ Omar
    getCard: (req, res) => {
        const productos = productModel.findAll();
        res.render('productCard', {
            title: 'carrito',
            productos 
        });
        console.log(productos);
    },

    updateProducts: async (req, res) => { 

        console.log(req.body);

        const values = req.body;

        try {
            await productModel.update(values, {
                where: {
                    id_producto: req.body.id_producto
                }
            });

            res.redirect('/Stock');
        } catch (error) {
            res.send('No se pudo actualizar!')
            console.log(error);
        }
    },
    //get/products/:id/detail/Mawe

    getProductDetail: (req, res) => {

        const id = Number(req.params.id);


        const productoAMostrar = productModel.findById(id);

        if (!productoAMostrar) {
            return res.send('error de id');
        }

        res.render('productDetail', { title: 'Detalle', product: productoAMostrar });
    },


    // @GET /products/:id/update

    getUpdate: (req, res) => {
        const id = Number (req.params.id);
        const productsToModify = productModel.findById(id)
        if (!productsToModify) {
            return res.send('El producto que desea buscar no se encuentra disponible :( ');
        }
        res.render('edicionProductos', {
            title: 'Edición Productos',
            product: productsToModify
        });
    },

    // // post/products


    postProduct: (req, res) => {

         let datos = req.body;

         datos.price = Number(datos.precio);

         /* datos.img = '/imgs/products/' + req.file.filename; */
         datos.img = req.files.map(file => '/img/' + file.filename);

         productModel.create(datos);


         res.redirect('/products');
     }

}
     
module.exports = controllers;

