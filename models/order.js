module.exports = (sequielize,DataTypes) => sequielize.define('order', {
  id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: true
    },
    article_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "article",
        key: "id"
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ship_date: {
      type: DataTypes.DATE,
      allowNull: false
    },        
    status: {
      type: DataTypes.ENUM('placed','approved','delivered'),
      allowNull: true
    },
    complete: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }},
    {
      timestamps: false,
      tableName: "order",
      freezeTableName: false,
    }
);


