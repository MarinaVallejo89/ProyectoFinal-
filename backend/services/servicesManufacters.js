const Manufacters = require("../models/modelManufacters");

const getAllManufacters = async (req, res) => {
  try {
    const data = await Manufacters.find({}).exec();
    res.json(data).status(200).end;
  } catch (err) {
    console.log(err);
    res.json({ res: "result not found" }).status(404).end();
  }
};

const getManufactersByName = async (req, res) => {
  const name = req.query.name.toUpperCase();
  try {
    const data = await Manufacters.find({ name: name }).exec();
    res.json(data).status(200).end;
  } catch (err) {
    res.json({ res: "result not found" }).status(404).end();
  }
};

const getProductsBrand = async (page =1) => {
  let ret = await Manufacters.paginate(
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

module.exports = { getAllManufacters, getManufactersByName, getProductsBrand };
