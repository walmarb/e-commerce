import express from 'express'
import productsRouter from './routes/products.routes.js'

const PORT = 8080
const app = express()

app.use(express.json())

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})

app.use('/products', productsRouter)