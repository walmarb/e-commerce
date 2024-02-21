import express from 'express'
import productsRouter from './routes/products.routes.js'
import cartsRouter from './routes/carts.routes.js'
import upload from './config/multer.js'
import { Server } from 'socket.io'
import { engine } from 'express-handlebars'
import {__dirname} from './path.js'


//Configuraciones y declaraciones
const PORT = 8080
const app = express()

//Server
const server = app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})

const io = new Server(server)

//Middlewares
app.use(express.json())
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')

//on es para recibir
//emit es para enviar
io.on('connection', (socket)=>{
    console.log("Conexion con socket.io")

    socket.on('movimiento', info =>{//Cuando el cliente me envia un mensaje lo capturo y lo muestro
        console.log(info)
    })

    socket.on('rendirse', info =>{ //Cuando el cliente me envia un mensaje lo capturo y lo muestro
        console.log(info)
        socket.emit('mensaje-jugador', "Te has rendido")// Cliente que envio este msje
        socket.broadcast.emit('rendicion', "El jugador se rindio") // Clientes que tengan establecida la comunicacion con el servidor
    })
})

//Routes
app.use('/api/products', productsRouter, express.static(__dirname + '/public'))
app.use('/api/carts', cartsRouter)
app.use('/static',express.static(__dirname + '/public'))
app.post('/api/upload',upload.single('product'), (req,res)=>{
    try {
        console.log(req.file)
        console.log(req.body)
    
        res.status(200).send("Imagen cargada correctamente")
    } catch (error) {
        res.status(500).send(`Error al cargar imagen: ${error}`)
    }
} )
/*
app.get('/static', (req,res)=>{
    
    const products = [
        {id: 1, title: "Lata de tomates", price: 1400, img: "./img/1708376735198lata-tomate.png"},
        {id: 2, title: "Lata de arvejas", price: 1600},
        {id: 3, title: "Lata de choclos", price: 1700},
        {id: 4, title: "Celular", price: 1800},
        {id: 5, title: "Celular", price: 1900}
    ]
    res.render('templates/home',{
        mostrarProductos: true,
        productos: products,
        css: 'home.css'
    })
})
*/

