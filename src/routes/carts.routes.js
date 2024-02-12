import { Router } from "express"
import { CartManager } from "../config/CartManager.js";

const cartsRouter = Router()
const cartsManager = new CartManager('./src/data/carts.json')

cartsRouter.get('/', async (req, res) => {
    try {
        const cart = await cartsManager.getCart()
        res.status(200).send(cart)
    } catch (error) {
        res.status(500).send(`Internal server error when get carts: ${error}`)
    }
})
cartsRouter.get('/:cid', async (req, res) => {
    
    const cartId = req.params.cid

    try {
        const message = await cartsManager.getCartById(cartId)

        if(message == "Cart Id is not found"){
            res.status(400).send(message)
        }else{
            res.status(200).send(message)
        }

    } catch (error) {
        res.status(500).send(`Internal server error when get cart: ${error}`)
    }
})
cartsRouter.post('/:cid/product/:pid', async (req, res) => {
    try {
        const cartId = req.params.cid
        const productId = req.params.pid
        const { quantity } = req.body

        const message = await cartsManager.addProductByCart(cartId, productId, quantity)

        if(message == "The cart id is not correct"){
            res.status(400).send(`The cart id: ${cartId} is not correct`)
        }else{
            res.status(200).send(message)
        }
    } catch (error) {
        res.status(500).send(`Internal error when adding product to cart: ${error}`)
    }
})
cartsRouter.post('/', async (req, res) => {
    try {
        const message = await cartsManager.createCart()
        res.status(201).send(message)
    } catch (error) {
        res.status(500).send(`Internal server error when creating the cart: ${error}`)
    }
})

export default cartsRouter
