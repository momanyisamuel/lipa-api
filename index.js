const express = require('express')
const connect = require("./utils/db")
let ProductModel = require('./models/product');
const app = express()
const PORT = process.env.PORT || 3000
app.get('/', async (req, res) => {
    console.log("Just got a request!")
    const product = await ProductModel.find()
    if(product) {
        res.send({product})
    }
})
app.listen(PORT, async () => {
    await connect()
    console.log(`Server running on port ${PORT}`)
})