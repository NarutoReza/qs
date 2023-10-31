const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const app = express()
const cors = require('cors')
app.use(cors())
require('dotenv').config()

const Routes = require('./Routes/Routes')
app.use(bodyparser.json())
app.use('/', Routes)

const PORT = process.env.PORT

mongoose
    .connect(process.env.DB_URL)
    .then(() => {
        console.log("MongoDB database is connected and live...!")
    })
    
app.listen(PORT, () => {
    console.log(`Server is up and running on ${PORT}`)
})