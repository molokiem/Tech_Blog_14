const { Model, DataTypes } = require("sequelize");
const db = require("../config/connection");
const BlogPost = require("./blogpost");

class Comment extends Model {}

Comment.init(
  {
    blog_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: BlogPost,
        key: "id",
      },
      onDelete: "CASCADE", // Delete comment when associated blog post is deleted
      onUpdate: "CASCADE", // Update comment when associated blog post is updated
    },
    contents: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "comment",
    freezeTableName: true,
  }
);

module.exports = Comment;
