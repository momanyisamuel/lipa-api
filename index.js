const express = require('express')
const connect = require("./utils/db")
let ProductModel = require('./models/product');
const app = express()
app.use(express.json())
const PORT = process.env.PORT || 3000
app.get('/', async (req, res) => {
    const product = await ProductModel.find()
    if(product) {
        res.send({product})
    }
})
app.post('/products', async (req, res) => {
    console.log(req.body)
    const product = new ProductModel({
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        quantity: req.body.quantity,
        stock: req.body.stock,
        img: req.body.img,
    })
    await product.save()
    if(product) {
        res.send({product})
    }
})
app.listen(PORT, async () => {
    await connect()
    console.log(`Server running on port ${PORT}`)
})