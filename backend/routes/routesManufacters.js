const router = require("express").Router();
const ServicesManufacters = require('../services/servicesManufacters.js');

router.get("/", async (req, res) => {
  
  try {

    let allProd = await ServicesManufacters.getProductsBrand()
    res.status(200).send(allProd)

  }catch(e){

    error = { message: e.message}
    res.send(500, error);
  }

});

module.exports = router;