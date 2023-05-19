const { Model, DataTypes } = require("sequelize");
const db = require("../config/connection");

class User extends Model {}

User.init(
  {
    username: {
      type: DataTypes.STRING(40),
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8], // Minimum length of 8 characters
      },
    },
  },
  {
    sequelize: db,
    modelName: "user",
  }
);

module.exports = User;
