const db  = require('../config/db.js');

exports.findArticleById = async(req, res) =>{
    db.Article.findOne(
        {   attributes: ['id', 'name','photoUrls','status'],
            where: 
            { id: req.params.id},
        include:[
            {model:db.Category}]})
            .then(article => {res.send(article)})
            .catch("Article not found",404)
}

exports.updateArticle = function(req, res) {  
    db.Article.findOne({ where: { id: req.param('id')} })
    .then(article => {   
    if (article) {
        article.update({
        name: req.param('name'),
        status: req.param('status'),
        photoUrls: req.body.photoUrls,
        categoryid: req.body.category.id  
      })
      .then(function (){ res.send("successful operation",200)})
      .catch(err=>{res.send("Invalid user supplied",400);})
    }
    else
    {
        db.Article.create(
            {
                name: req.param('name'),
                status: req.param('status'),
                photoUrls: req.body.photoUrls,
                categoryid: req.body.category.id  
              })
        .then(function (){ res.send("successful operation",200)})
        .catch(err=>res.send("Invalid user supplied",400))
    }
  }).catch(err=>res.send("Invalid user supplied",400))
};

exports.DeleteArticle = async(req, res) =>{
    db.Article.destroy({
        where: {id: req.param('id')}
      }).then(function (){ res.send("successful operation",200)})
      .catch(err=>res.send("Article not found",404))
};

exports.UploadImage = function(req, res) {
    res.send('NOT IMPLEMENTED');
};

exports.AddNewArticleToTheStore = async(req, res) =>{
    db.Article.create(
        {
            name: req.body.name,
            status: req.body.status,
            photoUrls: req.body.photoUrls,
            categoryid: req.body.category.id  
          })
    .then(function (){ res.send("successful operation",200)})
    .catch(err=>res.send("Invalid user supplied",400))
};

exports.UpdateAnExistingArticle = function(req, res) {
    db.Article.findOne({ where: { id: req.param('id')} })
    .then(article => {   
    if (article) {
        article.update({
        name: req.body.name,
        status: req.body.status,
        photoUrls: req.body.photoUrls,
        categoryid: req.body.category.id  
      })
      .then(function (){ res.send("successful operation",200)})
      .catch(err=>{res.send("Invalid user supplied",400);})
    }else{res.send("User not found",404)}
  }).catch(err=>res.send("Invalid user supplied",400))
};

exports.FindsArticleByStatus = function(req, res) {
    db.Article.findAll({ where: { status: req.body.status} })
    .then(articles => {res.send(articles)})
    .catch(err=>res.status(200).send("Invalid status value",400))
};