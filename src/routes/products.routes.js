import { Router } from "express"
import { ProductManager } from "../config/ProductManager.js"

const productManager = new ProductManager('./src/data/products.json')
const productsRouter = Router()



productsRouter.get('/', async (req,res) => {

    try {

        const { limit } = req.query

        let products = await productManager.getProducts()
        const queryLimit = parseInt(limit)

        if(!isNaN(queryLimit)){
            products = (products.slice(0, queryLimit))
        }

        res.status(200).send(products)

    } catch (error) {
        res.status(500).send(`Error interno del servidor al consultar clientes : ${ error }`)
    }
})

productsRouter.get('/:pid', async (req,res) =>{

    try {
        const idProducto = req.params.pid
        const prod = await productManager.getProductById(idProducto)
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
        const message = await productManager.addProduct(product)
        console.log(message, "aca")
        if(message == 'Producto creado correctamente'){
            res.status(200).send(message)
        }else{
            res.status(400).send(message)
        }
    } catch (error) {
        res.status(500).send(`Error al crear producto : ${error}`)
    }
})

productsRouter.put('/:pid', async (req,res) => {
    try {
        const idProducto = req.params.pid
        const product = req.body
        const message = await productManager.updateProduct(idProducto, product)

        if(message == "Producto actualizado correctamente"){
            res.status(200).send(message)
        }else{
            res.status(404).send(message)
        }
    } catch (error) {
        res.status(500).send(`Error al modificar producto : ${error}`)
    }
})

productsRouter.delete('/:pid', async (req,res) => {
    try {
        const idProducto = req.params.pid
        const message = await productManager.deleteProduct(idProducto)

        if(message == "Producto eliminado correctamente"){
            res.status(200).send(message)
        }else{
            res.status(404).send(message)
        }
    } catch (error) {
        res.status(500).send(`Error al eliminar producto : ${error}`)
    }
})

export default productsRouter