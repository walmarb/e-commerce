export class Cart{
    constructor(id){
        this.id = id
        this.CartProducts = []
    }
}

export class CartProduct{
    constructor(productId, quantity){
        this.productId = productId
        this.quantity = quantity
    }
}