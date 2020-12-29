module.exports = (sequielize,DataTypes) => sequielize.define('category', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING(24),
        allowNull: false
      },  
      }, 
      {
        timestamps: false,
        tableName: "category",
        freezeTableName: true
      }
  );
  
  
  