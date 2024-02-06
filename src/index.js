import { Product } from "./config/Product.js";
import { ProductManager } from "./config/ProductManager.js";
import express from 'express'

const PORT = 8000
const app = express()

const product1version2 = new Product("Arroz", "Barato", 100, 20, "A123")

const productManager = new ProductManager('./src/data/products.json')

app.get('/', (req,res)=>{
    res.send("Hola, desde mi primer servidor en Express")
})

app.get('/products', async (req,res) => {

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

app.get('/products/:pid', async (req,res) =>{

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

app.use(express.json())

app.post('/products', async (req,res) => {

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

app.put('/products/:pid', async (req,res) => {
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

app.delete('/products/:pid', async (req,res) => {
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


app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})

