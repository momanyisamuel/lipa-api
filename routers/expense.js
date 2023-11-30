const express = require("express");
const controllers = require("../controllers/expense");

const router = express.Router();
router
  .route("/")
  .get(async (req, res) => {
    try {
      const data = await controllers.getMany(req, res);
      res.send(data);
    } catch (error) {
      console.log(error);
    }
  })
  .post(async (req, res) => {
    try {
      const data = await controllers.createOne(req, res);
      res.send(data);
    } catch (error) {
      console.log(error);
    }
  });
router
  .route("/:id")
  .get(async (req, res) => {
    try {
      const data = await controllers.getOne(req, res);
    } catch (error) {
      console.log(error);
    }
  })
  .put(async (req, res) => {
    try {
      const data = await controllers.updateOne(req, res);
    } catch (error) {
      console.log(error);
    }
  })
  .delete(async (req, res) => {
    try {
      const data = await controllers.removeOne(req, res);
      res.send(data);
    } catch (error) {
      console.log(error);
    }
  });

module.exports = router;
