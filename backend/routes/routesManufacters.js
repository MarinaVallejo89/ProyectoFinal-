const router = require("express").Router();
const Manufacter = require('../models/modelManufacters.js');

router.get("/", async (req, res) => {

  try {

    let { name, page = 1, limit = 10 } = req.query;

    const filter = {};
    if (name){
      filter.name = { $regex: `.*${name}.*` };
    }else{
      throw new Error("Debe filtrar por nombre");
    } 

    const options  = { undefined, page, limit };  
    const result = await Manufacter.paginate(filter, options);

    // Si todo ha ido bien devolveremos un 200.
    // - El 204 representa una solicitud cuyos datos de entrada son válidos, pero no obstante no puede ofrecer resultados
    const response_code = (result.docs.length) ? 200 : 204;
    res.status(response_code).send(result);

  } catch(e){
    response_code = 500;
    result = { message: e.message }     
    res.status(response_code).send(result);
  }

});

module.exports = router;