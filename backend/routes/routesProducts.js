const router = require("express").Router();
const Product = require('../models/modelProducts.js');

router.get("/", async (req, res) => {
  
  try {

    let { model, color, price, brand, page = 1, limit = 10 } = req.query;

    const filter = {};
    if (model) filter.name  = { $regex: `.*${model}.*` };
    if (color) filter.color = { $regex: `.*${color}.*`  };
    if (price) filter.price = { $lte: price };

    // Validación sobre los parámetros: Evaluamos que no se está realizando una búsqueda con precios de producto negativo o sin precio
    if(price <= 0){
      throw new Error("No tenemos productos sin precio o con precio negativo");
    }

    if (brand) filter["manufacter.name"] = { $regex: `.*${brand}.*` };
  
    const options  = { undefined, page, limit };  
    const result = await Product.paginate(filter, options);

    // Validación sobre el resultado: Evaluamos alguna posible razón de error en las consultas
    if(page > result.totalPages){
      throw new Error("No hay más páginas!");
    }

    // Si todo ha ido bien devolveremos un 200.
    // - El 204 representa una solicitud cuyos datos de entrada son válidos, pero no obstante no puede ofrecer resultados
    response_code = (result.docs.length) ? 200 : 204;
    res.send(response_code, result);

  }catch(e){
    response_code = 500;
    error = { message: e.message}
    res.send(response_code, error);
  }

});

module.exports = router;