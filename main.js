import { Product } from "./Product.js";
import { ProductManager } from "./ProductManager.js";

const producto1 = new Product("Arroz", "Muy Rico", 1200, 20, "A123")
const producto2 = new Product("Lentejas", "Sanas", 1300, 20, "A124")
const producto3 = new Product("Yerba Mate", "Amarga", 1500, 20, "Y123")
const producto4 = new Product("Azucar", "Muy Rica", 1200, 20, "AE23")

const product1version2 = new Product("Arroz", "Barato", 100, 20, "A123")

const productManager = new ProductManager('./productos.json')

productManager.addProduct(producto1)
//productManager.addProduct(producto2)
//productManager.addProduct(producto3)
//productManager.addProduct(producto4)

//productManager.getProducts()
//productManager.getProductById('646cc046366242a169b4')
//productManager.updateProduct('69b4e5a2d2caf7a403fe', product1version2 )

//productManager.deleteProduct('21babf412d07e85c4630')
