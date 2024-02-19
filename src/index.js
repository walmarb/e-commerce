import express from 'express'
import productsRouter from './routes/products.routes.js'
import cartsRouter from './routes/carts.routes.js'
import {__dirname} from './path.js'

const PORT = 8080
const app = express()

app.use(express.json())
app.use('/static',express.static(__dirname + '/public'))

app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})