const express = require("express");
const controllers = require("../controllers/order");

const router = express.Router();
router
  .route("/")
  .get(async (req, res) => {
    try {
      const data = await controllers.getMany(req, res);
      res.send(data);
    } catch (error) {
      res.status(400).send(error);
    }
  })
  .post(async (req, res) => {
    try {
      const data = await controllers.createOne(req, res);
      res.send(data);
    } catch (error) {
      res.status(400).send(error);
    }
  });
router
  .route("/:id")
  .get(async (req, res) => {
    try {
      const data = await controllers.getOne(req, res);
    } catch (error) {
      res.status(400).send(error);
    }
  })
  .put(async (req, res) => {
    try {
      const data = await controllers.updateOne(req, res);
    } catch (error) {
      res.status(400).send(error);
    }
  })
  .delete(async (req, res) => {
    try {
      const data = await controllers.removeOne(req, res);
      res.send(data);
    } catch (error) {
      res.status(400).send(error);
    }
  });

module.exports = router;
