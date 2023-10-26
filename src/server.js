const express = require('express')
const data = require('../data')
const mongoose = require('mongoose')
const cors = require('cors');
const dotenv = require('dotenv')

//routes 
const categoriesRoute = require("./routes/categories")
const productsRoute = require("./routes/products")
const ordersRoute = require("./routes/order")
const queuesRoute = require("./routes/queue")

const app = express()
app.use(express.json())
dotenv.config()

// mdb connection
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@cluster0.r2livdc.mongodb.net/`, {
        useNewUrlParser: true, useUnifiedTopology: true 
    })
    .then(() => {
        console.log('DataBase Connected')
    })
    .catch((err) => console.log(err))


app.use(cors({
    origin: '*',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

app.use('/api', categoriesRoute)
app.use('/api', productsRoute)
app.use('/api', ordersRoute)
app.use('/api', queuesRoute)

app.listen(process.env.PORT, () => {
    console.log(`server at http://localhost:${process.env.PORT}`)
})
