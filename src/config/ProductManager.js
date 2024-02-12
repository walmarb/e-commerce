import { promises as fs } from 'fs'
import { Product } from './Product.js'
import crypto from 'crypto'

export class ProductManager{
    constructor(path){
        this.path = path
    }

    async addProduct(newProduct){
        const products = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        if (newProduct.code && newProduct.title && newProduct.description && newProduct.price && newProduct.thumbnail && newProduct.stock && newProduct.category){
            const indice = products.findIndex(prod => prod.code === newProduct.code)
            if(indice === -1){
                const product = new Product(crypto.randomBytes(10).toString('hex'), newProduct.title, newProduct.description, newProduct.code, newProduct.price, true, newProduct.stock, newProduct.category, newProduct.thumbnail)
                products.push(product)
                await fs.writeFile(this.path, JSON.stringify(products))
                return 'Producto creado correctamente'
            }else{
                return 'Producto ya existe en el array'
            }
        }else{
            return 'Debe ingresar un producto con todas sus propiedades'
        }
    }

    async getProducts(){
        const products = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        return products
    }

    async getProductById(id){
        const products = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const product = products.find(prod => prod.id === id)

        if(product){
            return product 
        }else{
            return 'Producto no existe' 
        }
    }

    async updateProduct(id, nuevoProducto){
        const products = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const indice = products.findIndex(product => product.id === id)
        if(indice != -1){
            products[indice].title = nuevoProducto.title            
            products[indice].description = nuevoProducto.description   
            products[indice].code = nuevoProducto.code         
            products[indice].price = nuevoProducto.price                                  
            products[indice].stock = nuevoProducto.stock
            products[indice].category = nuevoProducto.category            
            products[indice].thumbnail = nuevoProducto.thumbnail

            await fs.writeFile(this.path, JSON.stringify(products))
            return 'Producto actualizado correctamente' 
        }
        else{
            return'Producto no existe'
        }
    }   
    
    async deleteProduct(id){
        const products = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const indice = products.findIndex(product => product.id === id)
        if(indice != -1){
            const productsFiltrados = products.filter(product => product.id != id )
            await fs.writeFile(this.path, JSON.stringify(productsFiltrados))
            return 'Producto eliminado correctamente'
        }
        else{
            return 'Producto no existe'
        }
    } 
}