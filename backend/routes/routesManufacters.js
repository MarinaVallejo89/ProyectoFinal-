const router = require("express").Router();
const Manufacter = require('../models/modelManufacters.js');

router.get("/", async (req, res) => {
  const result = await Manufacter.find({}).exec();
  const response_code = (result.length) ? 0 : 1;
  res.json({response_code, result});
});

module.exports = router;
