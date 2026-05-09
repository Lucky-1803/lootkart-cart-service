const express = require('express')
const app = express()
app.use(express.json())
const routes = require('./routes/cart.route')
const { connectRedis } = require('./config/redis')
const runConsumer = require('./consumer/cart.consumer')
require('dotenv').config()
PORT = process.env.PORT

app.use("/cart",routes)

const startServer = async()=>{
    console.log("connecting Redis...")
    await connectRedis()
    console.log("connecting kafka...")
    await runConsumer()
    console.log("connecting server...")
    app.listen(PORT, ()=>{
        console.log(`Server is running on PORT : ${PORT}`)
    })
}

startServer()