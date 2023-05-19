const { BlogPost } = require("../models");

const BlogPostData = [
  {
    title: "The First BlogPost",
    contents: "This is the First Blog Post",
    username: "JohnDoe",
  },
  {
    title: "The Second BlogPost",
    contents: "This is the Second Blog Post",
    username: "JaneDoe",
  },
];

const seedBlogPost = () => BlogPost.bulkCreate(BlogPostData);

module.exports = seedBlogPost;
