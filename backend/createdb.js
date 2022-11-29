const mongoose = require('mongoose');
const url = "mongodb+srv://MarinaV:contramongo@cluster0.dw5itio.mongodb.net/proyectofinal?retryWrites=true&w=majority";

const Product = require('./models/modelProducts.js');
const Manufacter = require('./models/modelManufacters.js');
const products = require('./data/products');
const manufacters = require('./data/manufacters');

const createdb = async () => {
    const db = await mongoose.connect(url);
    await Product.deleteMany({});
    await Manufacter.deleteMany({});
    const newManufacters = await Manufacter.insertMany(manufacters);
    const newProducts = products.map( product => {
        const manufacter = newManufacters.filter(
            manufacter => manufacter.cif === product.manufacter)[0];
        const { _id, name } = manufacter;
        return { ...product, manufacter: { ref: _id, name }
        };
    });
    await Product.insertMany(newProducts);
    mongoose.connection.close()
};
createdb();