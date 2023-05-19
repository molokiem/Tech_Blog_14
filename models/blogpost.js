const { Model, DataTypes } = require("sequelize");
const db = require("../config/connection");
const User = require("./user");

class BlogPost extends Model {}

BlogPost.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contents: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(40),
      allowNull: false,
      references: {
        model: User,
        key: "username",
      },
    },
  },
  {
    sequelize: db,
    modelName: "blogPost",
    freezeTableName: true,
  }
);

module.exports = BlogPost;
