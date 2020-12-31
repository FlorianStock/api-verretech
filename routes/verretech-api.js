const fs = require('fs');

var express = require('express');
var userCtrl = require('../controllers/users');
var storeCtrl = require('../controllers/store');
var articleCtrl = require('../controllers/article');
var router = express.Router();
var verifytoken = require('../middleware/auth');

var UserController = require('../controllers/users')
var StoreController = require('../controllers/store')
var ArticleController = require('../controllers/article')

let users = {
    florian: {password: "fenrirproject"},
    emmanuel: {password:"fenrirproject"},
    coralie: {password:"fenrirproject"},
    quentin: {password:"fenrirproject"}
}

router.route('/').get(verifytoken,function(req, res)
    {
        let rawdata = fs.readFileSync('./swagger.json');
        let swagger = JSON.parse(rawdata);

        var data = {
            Api: 'Verre-Tech SimulatorAPI',
            Version: '1.0',
            Copright: '2020 FenrirProject',
            Swagger: swagger
        };
        res.json(data)
            
    });

router.route('/oauth/authorize').get(verifytoken,UserController.getAuthorizationUser);
router.route('/user/:username').get(verifytoken,UserController.getUserByName);
router.route('/user/').post(verifytoken,UserController.createUser);
router.route('/user/:username').put(verifytoken,UserController.updateUser);
router.route('/user/:username').delete(verifytoken,UserController.deleteUser);
router.route('/user/login').get(UserController.getLogsUser);
router.route('/user/logout').get(verifytoken,UserController.getLogsOutUser);

router.route('/article/:id').get(verifytoken,ArticleController.findArticleById);
router.route('/article/:id').post(verifytoken,ArticleController.updateArticle);
router.route('/article/:id').delete(verifytoken,ArticleController.DeleteArticle);
router.route('/article/:id/uploadImage').post(verifytoken,ArticleController.UploadImage);
router.route('/article').post(verifytoken,ArticleController.AddNewArticleToTheStore);
router.route('/article').put(verifytoken,ArticleController.UpdateAnExistingArticle);
router.route('/article/findByStatus').put(verifytoken,ArticleController.FindsArticleByStatus);

router.route('/store/inventory').get(verifytoken,StoreController.articlesInventories);
router.route('/store/order/:orderid').get(verifytoken,StoreController.order);
router.route('/store/order/:orderid').delete(verifytoken,StoreController.deletePurchaseOrder);
router.route('/store/order').post(verifytoken,StoreController.placeOrderOfArticle);

module.exports = router;