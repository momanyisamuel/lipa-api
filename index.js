const express = require('express')
const connect = require("./utils/db")
let ProductModel = require('./models/product');
const app = express()
const PORT = process.env.PORT || 3000
app.all('/', async (req, res) => {
    console.log("Just got a request!")
    const product = await new ProductModel({
        name: 'test',
        price: '100',
        category: 'test',
        quantity: '100',
        stock: '100',
        img: 'test'
    })
    if(product) {
        res.send({product})
    }
})
app.listen(PORT, async () => {
    await connect()
    console.log(`Server running on port ${PORT}`)
})