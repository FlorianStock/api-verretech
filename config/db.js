const Sequelize = require('sequelize')
const db = {}

const sequelize = new Sequelize('verretech-erp-db', 'root', 'fenrirproject2020', {
  host: 'localhost',
  port:'27017',
  dialect: 'mysql', 
  multipleStatements: true,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

db.User = require('../models/user.js')(db.sequelize,db.Sequelize);
db.Order = require('../models/order.js')(db.sequelize,db.Sequelize);
db.Article = require('../models/article.js')(db.sequelize,db.Sequelize);
db.Category = require('../models/category.js')(db.sequelize,db.Sequelize);
db.Inventory = require('../models/inventory.js')(db.sequelize,db.Sequelize);

db.Article.belongsTo(db.Category, {foreignKey: "categoryid",});
db.Order.belongsTo(db.Article, {foreignKey: "articleid",});
db.Inventory.belongsTo(db.Article, {foreignKey: "articleid",});

module.exports = db
