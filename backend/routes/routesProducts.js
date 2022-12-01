const router = require("express").Router();
const ServiceProduct = require('../services/servicesProducts.js');

router.get("/", async (req, res) => {
  
  try {
    let q = req.query
    let allProd = await ServiceProduct.getProductsBrandColorPrice2(q)
    res.status(200).send(allProd)

  }catch(e){
    response_code = 500;
    error = { message: e.message}
    res.send(response_code, error);
  }

});

module.exports = router;