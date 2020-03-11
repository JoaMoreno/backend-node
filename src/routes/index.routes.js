const { Router } = require("express");
const router = Router();

const productCtrl = require('../controllers/products.controller')

//router.route('/').get(authCtrl.sayHello)

router.route('/products')
    .get(productCtrl.getData)
    .post(productCtrl.createData)
    .put(productCtrl.deleteData)

router.route('/products/:id')
    .post(productCtrl.deleteData)

module.exports = router;