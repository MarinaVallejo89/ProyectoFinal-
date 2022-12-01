const Products = require("../models/modelProducts");
const Manufacter = require("../models/modelManufacters");

const getProductsBrandColorPrice2 = async (query) => {

  let and = []
  let page = query.page ? query.page : 1;
  let sort = query.sort ? query.sort : 'price';

  const regex = new RegExp(escapeRegex(query.brand ?? ''), "gi");
  and.push({ name: regex })

  if(query.color !== undefined){
    and.push({ color: query.color })
  }

  if(query.price !== undefined){
    and.push({ price: { $lt: query.price }})
  }

  return await Products.paginate(
    {
      $and: and,
    },
    {
      page,
      sort: { 
        [sort]: 1
      },
      limit: query.limit ?? 10
    }
  );
};

const escapeRegex = (text) => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

const getAllProducts = async (page) => {
  return await Products.paginate(
    {},
    { page, sort: { ["price"]: 1 }, limit: 10 }
  );
};

const getProductsBrandColorPrice = async (brand, color, price, page) => {
  const regex = new RegExp(escapeRegex(brand), "gi");
  return await Products.paginate(
    {
      $and: [{ name: regex }, { color: color }, { price: { $lt: price } }],
    },
    { page, sort: { ["price"]: 1 }, limit: 10 }
  );
};

const getProductsBrandColor = async (brand, color, page) => {
  const regex = new RegExp(escapeRegex(brand), "gi");
  return await Products.paginate(
    {
      $and: [{ name: regex }, { color: color }],
    },
    { page, sort: { ["price"]: 1 }, limit: 10 }
  );
};

const getProductsBrandPrice = async (brand, price, page) => {
  const regex = new RegExp(escapeRegex(brand), "gi");
  return await Products.paginate(
    {
      $and: [{ name: regex }, { price: { $lt: price } }],
    },
    { page, sort: { ["price"]: 1 }, limit: 10 }
  );
};

const getProductsColorPrice = async (color, price, page) => {
  return await Products.paginate(
    {
      $and: [{ color: color }, { price: { $lt: price } }],
    },
    { page, sort: { ["price"]: 1 }, limit: 10 }
  );
};

const getAllProductsColor = async (page) => {
  let ret = await Products.paginate(
    { page, sort: { ["price"]: 1 } }
  );
  let colors = []
  ret.docs.map((row)=>{
    colors.push(row.color)
  })
  let result = colors.filter((item,index)=>{
    return colors.indexOf(item) === index;
  })
  return result
};

const getProductsBrand = async (page =1) => {
  let ret = await Manufacter.paginate(
  );
  let brands = []
  ret.docs.map((row)=>{
    brands.push(row.name)
  })
  let result = brands.filter((item,index)=>{
    return brands.indexOf(item) === index;
  })
  return result
};

const getProductsPrice = async (price, page) => {
  return await Products.paginate(
    { price: { $lt: price } },
    { page, sort: { ["price"]: 1 }, limit: 10 }
  );
};

module.exports = {
  getAllProducts,
  getProductsBrandColorPrice,
  getProductsBrandColorPrice2,
  getProductsBrandColor,
  getProductsBrandPrice,
  getProductsColorPrice,
  getAllProductsColor,
  getProductsBrand,
  getProductsPrice,
};
