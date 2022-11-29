const router = require("express").Router();
const Product = require('../models/modelProducts.js');

router.get("/", async (req, res) => {
  let { model, color, price, brand, page = 1, limit = 10 } = req.query;

  const filter = {};
  if (model) filter.name  = { $regex: `.*${model}.*` };
  if (color) filter.color = { $regex: `.*${color}.*`  };
  if (price) filter.price = { $lte: price };
  if (brand) filter["manufacter.name"] = { $regex: `.*${brand}.*` };

  const populate = { path: 'manufacter.ref', select: '-_id cif address' };
  const options  = { populate, page, limit };

  const result = await Product.paginate(filter, options);
  response_code = (result.docs.length) ? 0 : 1;
  res.json({response_code, result});
});

module.exports = router;
