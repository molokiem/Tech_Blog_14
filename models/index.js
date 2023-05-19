const User = require("./user");
const BlogPost = require("./blogpost");
const Comment = require("./comment");

User.hasMany(BlogPost, {
  foreignKey: "username",
});

BlogPost.belongsTo(User, {
  foreignKey: "username",
});

User.hasMany(Comment, {
  foreignKey: "username",
});

Comment.belongsTo(User, {
  foreignKey: "username",
});

BlogPost.hasMany(Comment, {
  foreignKey: "blog_id",
});

Comment.belongsTo(BlogPost, {
  foreignKey: "blog_id",
});

module.exports = { BlogPost, Comment, User };
