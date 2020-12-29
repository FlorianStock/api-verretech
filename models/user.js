module.exports = (sequielize,DataTypes) => sequielize.define('user', {
    ID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      username: {
        type: DataTypes.STRING(24),
        allowNull: false
      },
      firstname: {
        type: DataTypes.STRING(128),
        allowNull: false
      },
      lastname: {
        type: DataTypes.STRING(64),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(64),
        allowNull: false
      },
      password: {
        type: DataTypes.STRING(64),
        allowNull: false
      },
      phone: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      userStatus: {
        type: DataTypes.INTEGER,
        allowNull: false
      }},
      {
        timestamps: false,
        tableName: "user",
        freezeTableName: true
      }
);


