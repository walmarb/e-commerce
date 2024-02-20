import express from 'express'
import productsRouter from './routes/products.routes.js'
import cartsRouter from './routes/carts.routes.js'
import upload from './config/multer.js'
import { engine } from 'express-handlebars'
import {__dirname} from './path.js'


//Configuraciones y declaraciones
const PORT = 8080
const app = express()

//Middlewares
app.use(express.json())
app.use('/static',express.static(__dirname + '/public'))
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')

//Routes
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.post('/api/upload',upload.single('product'), (req,res)=>{
    try {
        console.log(req.file)
        console.log(req.body)
    
        res.status(200).send("Imagen cargada correctamente")
    } catch (error) {
        res.status(500).send(`Error al cargar imagen: ${error}`)
    }
} )
app.get('/static', (req,res)=>{
    
    const products = [
        {id: 1, title: "Lata de tomates", price: 1400, img: "./img/1708376735198lata-tomate.png"},
        {id: 2, title: "Celular", price: 1600},
        {id: 3, title: "Celular", price: 1700},
        {id: 4, title: "Celular", price: 1800},
        {id: 5, title: "Celular", price: 1900}
    ]
    res.render('templates/products',{
        mostrarProductos: true,
        productos: products,
        css: 'products.css'
    })
})

//Server
app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})