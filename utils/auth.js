const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.JWT_SECRET;
const expiry = "1h";

const helpers = {
  newToken: (user) => {
    return jwt.sign({ id: user.id }, secret, {
      expiresIn: expiry,
    });
  },
  verifyToken: (token) =>
    new Promise((resolve, reject) => {
      jwt.verify(token, secret, (err, payload) => {
        if (err) return reject(err);
        resolve(payload);
      });
    })
};
