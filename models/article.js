module.exports = (sequielize,DataTypes) => sequielize.define('article', {
  id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(24),
      allowNull: false
    },
    categoryid: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "category",
        key: "id"
      }
    },    
    photoUrls: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      get: function() {
        var a = this.getDataValue('photoUrls').replace(/'/g, '"');
        a = JSON.parse(a);
        return a}
    },
    status: {
      type: DataTypes.ENUM('available','pending','sold'),
      allowNull: true
    }},
    {
      timestamps: false,
      tableName: "article",
      freezeTableName: false,
    }
);



