import express from 'express'
import productsRouter from './routes/products.routes.js'
import cartsRouter from './routes/carts.routes.js'
import userRouter from './routes/user.routes.js'
import upload from './config/multer.js'
import messageModel from './models/messages.js'
import mongoose from 'mongoose'
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

//Connection DB
mongoose.connect("mongodb+srv://walmarb:coderhouse@cluster0.6kw5rwg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("DB is connected"))
    .catch(e => console.log(e))

//Middlewares
app.use(express.json())
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')

io.on('connection', (socket) => {
    console.log("Conexion con Socket.io")

    socket.on('mensaje', async (mensaje) => {
        try {
            await messageModel.create(mensaje)
            const mensajes = await messageModel.find()
            io.emit('mensajeLogs', mensajes)
        } catch (e) {
            io.emit('mensajeLogs', e)
        }

    })

})

//Routes
app.use('/api/products', productsRouter, express.static(__dirname + '/public'))
app.use('/api/carts', cartsRouter)
app.use('/static',express.static(__dirname + '/public'))
app.use('/api/users', userRouter)

app.post('/api/upload',upload.single('product'), (req,res)=>{
    try {
        console.log(req.file)
        console.log(req.body)
    
        res.status(200).send("Imagen cargada correctamente")
    } catch (error) {
        res.status(500).send(`Error al cargar imagen: ${error}`)
    }
} )


