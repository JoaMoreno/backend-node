const Products = require('../models/Product.model');
const productCtrl = {};

productCtrl.getData = async (req, res) => {
    const data = await Products.find()
    res.json(data)
}

productCtrl.createData = async (req, res) => {

    const { name, description, imgURL } = req.body;
    const newProduct = new Products({ name, description, imgURL });
    await newProduct.save();

    res.json({
        msg: 'SAVED',
        newProduct
    })
};

productCtrl.deleteData = async (req, res) => {
    //Products.findOneAndDelete
    const { id } = req.params
    await Products.findByIdAndDelete(id)
    res.json('DELETED')
}

module.exports = productCtrl;