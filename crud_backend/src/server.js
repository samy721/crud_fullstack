const express = require('express')
const app = express()
const cors = require('cors')
const connect = require('./configs/db')
const userController = require('./controllers/user.controller')

app.use(cors())
app.use(express.json())

app.use("/users",userController)

app.listen(1221,async() =>{
    await connect()
    console.log("listening to port 1221")
})
