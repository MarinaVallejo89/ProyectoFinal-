const router = require("express").Router();
const ServiceProduct = require('../services/servicesProducts.js');

router.get("/", async (req, res) => {
  
  try {

    let allProd = await ServiceProduct.getAllProductsColor()
    res.status(200).send(allProd)

  }catch(e){

    error = { message: e.message}
    res.send(500, error);
  }

});

module.exports = router;