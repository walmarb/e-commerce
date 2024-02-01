import { Product } from "./config/Product.js";
import { ProductManager } from "./config/ProductManager.js";
import express from 'express'

const PORT = 8000
const app = express()

/* const producto1 = new Product("Arroz", "Muy Rico", 1200, 20, "A123")
const producto2 = new Product("Lentejas", "Sanas", 1300, 20, "A124")
const producto3 = new Product("Yerba Mate", "Amarga", 1500, 20, "Y123")
const producto4 = new Product("Azucar", "Muy Rica", 1200, 20, "AE23")
 */

const product1version2 = new Product("Arroz", "Barato", 100, 20, "A123")

const productManager = new ProductManager('./src/data/products.json')

app.get('/', (req,res)=>{
    res.send("Hola, desde mi primer servidor en Express")
})

app.get('/products', async (req,res) => {

    try {
        const { limit } = req.query

        const products = await productManager.getProducts()
        const queryLimit = parseInt(limit)
    
        if(queryLimit || queryLimit > 0){
            
            const productsLimit = products.slice(0, queryLimit)
            res.status(200).send(productsLimit)
        }else{
            res.status(400).send("Error al consultar clientes, ingrese un valor valido en los queryes")
        }
        
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
        const message = await productManager.addProduct(product)
        console.log(message)
        if(message == 'Producto creado correctamente'){
            res.status(200).send(message)
        }else{
            res.status(400).send(message)
        }
    } catch (error) {
        res.status(500).send(`Error al crear producto`)
    }
})

app.put('/products', async (req,res) => {
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

app.delete('/products', async (req,res) => {
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

