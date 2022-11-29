const { model, Schema } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const productSchema = new Schema(
  {
    name: String,
    manufacturer: { 
        ref: { type: Schema.Types.ObjectId, ref: 'Manufacter'},
        name: String
    },
    color: String,
    price: Number
}
);

productSchema.plugin(mongoosePaginate);

const Product = model("Product", productSchema);

module.exports = Product;
