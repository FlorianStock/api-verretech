module.exports = (sequielize,DataTypes) => sequielize.define('inventory', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: true
      },
      article_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "article",
          key: "id"
        }
      },    
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      }},
      {
        timestamps: false,
        tableName: "inventory",
        freezeTableName: false,
      }
  );
  
  
  