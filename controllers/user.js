let UserModel = require('../models/user');
const helpers = require('../utils/auth');

const controllers = {
    getMany: async (req, res) => {
        try {
            const docs = await UserModel.find({});
            res.send({ data: docs });
            console.log(docs)
        } catch (err) {
            console.error(err);
            res.json({ error: err.message });
        }
    },
    getOne: async (req, res) => {
        try {
            const doc = await UserModel.findOne({ _id: req.params.id }).lean().exec();
            if (!doc) {
                return res.json({ message: 'User not found' });
            }
            res.json({ data: doc });
        } catch (err) {
            console.error(err);
            res.json({ error: err.message });
        }
    },
    createOne: async (req, res) => {
        try {
            const doc = await UserModel.create({...req.body });
            const token = helpers.newToken(doc);
            res.json({ data: token });
        } catch (err) {
            console.error(err);
            res.json({ error: err.message });
        }
    },
    updateOne: async (req, res) => {
        try {
            const updatedDoc = await UserModel
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
                return res.json({ status: "404 Not Found"});
            }
            
            res.json({ data: updatedDoc });
            
        } catch (err) {
            console.error(err);
            res.json({ error: err.message });
        }
    },
    removeOne: async (req, res) => {
        try {
            const removed = await UserModel.findOneAndRemove({
                _id: req.params.id,
            });
            
            if (!removed) {
                return res.json({ error: "User not found"});
            }
            
            return res.json({ data: removed });
            
        } catch (err) {
            console.error(err);
            res.json({ error: err.message });
        }
    },
    signIn: async (req, res) => {
        if (!req.body.email || !req.body.password) {
            return res.status(400).send({ message: "need email and password" });
          }
        
          const invalid = { message: "Invalid email and passoword combination" };
        
          try {
            const user = await UserModel.findOne({ email: req.body.email })
              .select("email password")
              .exec();
        
            if (!user) {
              return res.json(invalid);
            }
        
            const match = await userModel.checkPassword(req.body.password);
        
            if (!match) {
              return res.json(invalid);
            }
        
            const token = helpers.newToken(user);
            return res.json({ user: user, token });
          } catch (e) {
            console.error(e);
            res.json({error: e.message});
          }
    },
    protect: async (req, res, next) => {
        const bearer = req.headers.authorization;
      
        if (!bearer || !bearer.startsWith("Bearer ")) {
          return res.json({message: "Invalid Bearer token"});
        }
      
        const token = bearer.split("Bearer ")[1].trim();
        let payload;
        try {
          payload = await helpers.verifyToken(token);
        } catch (e) {
          return res.json({ error: e });
        }
      
        const user = await User.findById(payload.id)
          .select("-password")
          .lean()
          .exec();
      
        if (!user) {
          return res.json({ error:"User not found"});
        }
      
        req.user = user;
        next();
    },
};

module.exports = controllers