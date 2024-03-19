import { Router } from "express"
import productModel from "../models/product.js";

const productsRouter = Router()

productsRouter.get('/', async (req,res) => {

    try {

        const { limit } = req.query

        let products = await productModel.find().lean()
        const queryLimit = parseInt(limit)

        if(!isNaN(queryLimit)){
            products = (products.slice(0, queryLimit))
        }

        res.status(200).render('templates/home',{
            mostrarProductos: true,
            productos: products,
            css: 'home.css'
        })    
        //res.status(200).send(products)

    } catch (error) {
        res.status(500).render('templates/error',{
            error: error,
        })
        //res.status(500).send(`Error interno del servidor al consultar clientes : ${ error }`)
    }
})

productsRouter.get('/:pid', async (req,res) =>{

    try {
        const idProducto = req.params.pid
        const prod = await productModel.findById(idProducto).lean()
        if(prod){
            res.status(200).send(prod)
        }else{
            res.status(404).send("Producto no existe")
        }
    } catch (error) {
        res.status(500).send("Error interno al buscar un producto particular")
    }

})

productsRouter.post('/', async (req,res) => {

    console.log(req.body)
    try {
        const product = req.body
        console.log(product,"llego")
        const message = await productModel.create(product)
        res.status(201).send(message)
    } catch (error) {
        res.status(500).send(`Error al crear producto : ${error}`)
    }
})

productsRouter.put('/:pid', async (req,res) => {
    try {
        const idProducto = req.params.pid
        const product = req.body
        const message = await productModel.findByIdAndUpdate(idProducto, product)

        res.status(200).send(message)

    } catch (error) {
        res.status(500).send(`Error al modificar producto : ${error}`)
    }
})

productsRouter.delete('/:pid', async (req,res) => {
    try {
        const idProducto = req.params.pid
        const message = await productModel.findByIdAndDelete(idProducto)

        res.status(200).send(message)

    } catch (error) {
        res.status(500).send(`Error al eliminar producto : ${error}`)
    }
})

export default productsRouter