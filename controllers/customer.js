let CustomerModel = require('../models/customer');

const controllers = {
    getMany: async (req, res) => {
        try {
            const docs = await CustomerModel.find({});
            res.send({ data: docs });
            console.log(docs)
        } catch (err) {
            console.error(err);
        }
    },
    getOne: async (req, res) => {
        try {
            const doc = await CustomerModel.findOne({ _id: req.params.id }).lean().exec();
            if (!doc) {
                return res.status(400).end();
            }
            res.status(200).json({ data: doc });
        } catch (err) {
            console.error(err);
            res.status(400).end();
        }
    },
    createOne: async (req, res) => {
        try {
            const doc = await CustomerModel.create({...req.body });
            res.status(201).json({ data: doc });
        } catch (err) {
            console.error(err);
            res.status(400).end();
        }
    },
    updateOne: async (req, res) => {
        try {
            const updatedDoc = await CustomerModel
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
                return res.status(400).end();
            }
            
            res.status(200).json({ data: updatedDoc });
            
        } catch (err) {
            console.error(err);
            res.status(400).end();
        }
    },
    removeOne: async (req, res) => {
        try {
            const removed = await CustomerModel.findOneAndRemove({
                _id: req.params.id,
            });
            
            if (!removed) {
                return res.status(400).end();
            }
            
            return res.status(200).json({ data: removed });
            
        } catch (err) {
            console.error(err);
            res.status(400).end();
        }
    }
};

module.exports = controllers