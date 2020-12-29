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

router.route('/oauth/authorize').get(UserController.getAuthorizationUser);
router.route('/user/:username').get(UserController.getUserByName);
router.route('/user/').post(UserController.createUser);
router.route('/user/:username').put(UserController.updateUser);
router.route('/user/:username').delete(UserController.deleteUser);
router.route('/user/login').get(UserController.getLogsUser);
router.route('/user/logout').get(UserController.getLogsOutUser);

router.route('/article/:id').get(ArticleController.findArticleById);
router.route('/article/:id').post(ArticleController.updateArticle);
router.route('/article/:id').delete(ArticleController.DeleteArticle);
router.route('/article/:id/uploadImage').post(ArticleController.UploadImage);
router.route('/article').post(ArticleController.AddNewArticleToTheStore);
router.route('/article').put(ArticleController.UpdateAnExistingArticle);
router.route('/article/findByStatus').put(ArticleController.FindsArticleByStatus);

router.route('/store/inventory').get(StoreController.ArticlesInventories);
router.route('/store/order/:orderid').get(StoreController.GetOrderById);
router.route('/store/order/:orderid').delete(StoreController.DeleteOrderById);
router.route('/store/order').post(StoreController.PlaceOrderForArticle);

module.exports = router;