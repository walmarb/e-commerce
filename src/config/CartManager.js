import { promises as fs } from 'fs'
import { Cart, CartProduct } from './Cart.js'
import crypto  from 'crypto'
import { ProductManager } from "../config/ProductManager.js"

const productManager = new ProductManager('./src/data/products.json')

export class CartManager{
    constructor(path){
        this.path = path
    }
    async addProductByCart(idCart, idProduct, quantityParam) {

        const carts = JSON.parse(await fs.readFile(this.path, 'utf-8'))

        const cartindex = carts.findIndex(cart => cart.id == idCart)

        if(cartindex != -1){
            try {
                const product = await productManager.getProductById(idProduct)

                if(product === "Producto no existe"){
                    return "Product not found"
                }
                const cartProductindex = carts[cartindex].CartProducts.findIndex(CartProduct => CartProduct.productId === product.id)
                console.log(cartProductindex)

                if(cartProductindex != -1){
                    carts[cartindex].CartProducts[cartProductindex].quantity += quantityParam
                }else{
                    const productCart = new CartProduct(product.id, quantityParam)
                    carts[cartindex].CartProducts.push(productCart)
                }

                await fs.writeFile(this.path, JSON.stringify(carts))

                return "Product successfully added"
            } catch (error) {
                return "Product could not be added"
            }
        }else{
            return "The cart id is not correct"
        }
    }

    async getCart() {
        const cart = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        return cart
    }
    async getCartById(idCart) {
        const carts = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const cartProductindex = carts.findIndex(cart => cart.id === idCart)
        if(cartProductindex != -1){
            console.log(carts[cartProductindex])
            return carts[cartProductindex]
        }else{
            return "Cart Id is not found"
        }
    }

    async createCart(){
        const carts = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        
        const newCart = new Cart(crypto.randomBytes(10).toString('hex'))

        carts.push(newCart)

        await fs.writeFile(this.path, JSON.stringify(carts))

        return newCart
    }
}