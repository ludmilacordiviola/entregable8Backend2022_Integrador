import express from "express";
import productRouter from './router/productRouter.js'
import cartRouter from './router/cartsRouter.js'
import {} from 'dotenv/config'

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const PORT = process.env.PORT || 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})

app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)