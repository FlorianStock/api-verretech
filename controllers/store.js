const db  = require('../config/db.js');

exports.ArticlesInventories = function(req, res) {
    db.Inventory.findAll(
        {   attributes: ['articleid','quantity'],
      
        include:[
            {model:db.Article,
            attributes: ['name','status']}]
        })
            .then(article => {res.send(article)})
            .catch("Invalid Order",404)
};

exports.DeleteOrderById = function(req, res) {
    db.Order.destroy({
        where: {username: req.param('orderid')}
    }).then(order => {
        res.send("successful operation",200)   
    }).catch(err=>res.send("Order not found",404))   
};

exports.PlaceOrderForArticle = function(req, res) {
    db.Order.create({
        article_id: req.param('article_id'),
        quantity: req.param('quantity'),
        ship_date: req.param('ship_date'),
        status: req.param('status'),
        complete: req.param('complete')
    }).then(res => {
        res.send("successful operation",200) 
    }).catch(err=>res.send("Invalid order",400));
};

exports.GetOrderById = function(req, res) {
    db.Order.findOne({where:{ id: req.param('orderid')}})
            .then(order => {res.send(order)})
            .catch("Order not found",404)
};