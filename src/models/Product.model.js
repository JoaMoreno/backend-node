const {Schema, model} = require('mongoose');

const productSchema = new Schema({
    name: String,
    description: String,
    imgURL: String
},{
    timestamps: true
});

module.exports = model("Product", productSchema);