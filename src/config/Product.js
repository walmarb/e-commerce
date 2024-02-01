import crypto from 'crypto'

export class Product{
    constructor(title, description, price, stock, code){
        this.title = title
        this.description = description
        this.price = price
        this.stock = stock
        this.code = code
        this.thumbnail = []
        this.id = crypto.randomBytes(10).toString('hex')
    }

    async createProduct(product){
        this.title = product.title
        this.description = product.description
        this.price = product.price
        this.stock = product.stock
        this.code = product.code
        this.thumbnail = product.thumbnail
        this.id = crypto.randomBytes(10).toString('hex')
    }
}