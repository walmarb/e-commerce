import express from 'express'
import productsRouter from './routes/products.routes.js'
import cartsRouter from './routes/carts.routes.js'
import upload from './config/multer.js'
import {__dirname} from './path.js'

//Configuraciones y declaraciones
const PORT = 8080
const app = express()

//Middlewares
app.use(express.json())
app.use('/static',express.static(__dirname + '/public'))

//Routes
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.post('api/upload',upload.single('product'), (req,res)=>{
    try {
        console.log(req.file)
        console.log(req.body)
    
        res.status(200).send("Imagen cargada correctamente")
    } catch (error) {
        res.status(500).send(`Error al cargar imagen: ${error}`)
    }
} )

//Server
app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})