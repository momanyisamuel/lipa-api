const OrderModel = require('../models/order');
const ProductModel = require('../models/product');

const controllers = {
    getMany: async (req, res) => {
        try {
            const docs = await OrderModel.find({});
            res.send({ data: docs });
            console.log(docs)
        } catch (err) {
            console.error(err);
            res.json({ error: err});
        }
    },
    getOne: async (req, res) => {
        try {
            const doc = await OrderModel.findOne({ _id: req.params.id }).lean().exec();
            if (!doc) {
                return res.json({ error: "Couldn't find Order"});
            }
            res.json({ data: doc });
        } catch (err) {
            console.error(err);
            res.json({ error: err});
        }
    },
    createOne: async (req, res) => {
        try {
            //for each item in the order loop and find the product
            // then deduct the stock and update the Product
            console.log(req.body)
            const products = req.body.items;
            for (let i = 0; i < products.length; i++) {
                const product = await ProductModel.findOne({ _id: products[i]._id }).lean().exec();
                if (!product) {
                    return res.json({ error:"Product not found"});
                }
                const updatedProduct = await ProductModel.findOneAndUpdate(
                    { _id: products[i]._id},
                    {
                        stock: product.stock - products[i].quantity,
                    },
                    { new: true }
                    )
                if (!updatedProduct) {
                    return res.json({ status:"error", message: "Product not updated"});
                }
            }
            const doc = await OrderModel.create({...req.body });
            res.json({ data: doc });
        } catch (err) {
            console.error(err);
            res.json({ error: err});
        }
    },
    updateOne: async (req, res) => {
        try {
            const updatedDoc = await OrderModel
              .findOneAndUpdate(
                    {
                        _id: req.params.id,
                    },
                    req.body,
                    { new: true }
                )
              .lean()
              .exec();
              
            if (!updatedDoc) {
                return res.json({ status: "404 Not Found", message:"Not Found"});
            }
            
            res.json({ data: updatedDoc });
            
        } catch (err) {
            console.error(err);
            res.json({ error: err});
        }
    },
    removeOne: async (req, res) => {
        try {
            const removed = await OrderModel.findOneAndRemove({
                _id: req.params.id,
            });
            
            if (!removed) {
                return res.status(400).end();
            }
            
            return res.status(200).json({ data: removed });
            
        } catch (err) {
            console.error(err);
            res.json({ error: err});
        }
    }
};

module.exports = controllers