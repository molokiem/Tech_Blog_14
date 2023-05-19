const express = require("express");
const router = express.Router();
const { User, BlogPost, Comment } = require("../../models");

// Get all blog posts with associated user information
router.get("/", async (req, res) => {
  try {
    const blogPosts = await BlogPost.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    res.json(blogPosts);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve blog posts." });
  }
});

// Get a specific blog post by ID with associated user information
router.get("/:id", async (req, res) => {
  try {
    const blogPost = await BlogPost.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    if (!blogPost) {
      return res.status(404).json({ error: "Blog post not found." });
    }

    res.json(blogPost);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve the blog post." });
  }
});

// Create a new blog post
router.post("/", async (req, res) => {
  if (req.session.logged_in) {
    try {
      const newBlogPost = await BlogPost.create({
        title: req.body.title,
        contents: req.body.contents,
        username: req.session.username,
      });

      res.json(newBlogPost);
    } catch (error) {
      res.status(500).json({ error: "Failed to create the blog post." });
    }
  } else {
    res.status(401).send("Not logged in!");
  }
});

// Update a blog post
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBlogPost = await BlogPost.update(req.body, {
      where: {
        id: id,
      },
    });

    if (updatedBlogPost[0] === 0) {
      return res.status(404).json({ error: "Blog post not found." });
    }

    res.json({ message: "Blog post updated successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to update the blog post." });
  }
});

// Delete a blog post
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBlogPostCount = await BlogPost.destroy({
      where: {
        id: id,
      },
    });

    if (deletedBlogPostCount === 0) {
      return res.status(404).json({ error: "Blog post not found." });
    }

    res.json({ message: "Blog post deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the blog post." });
  }
});

module.exports = router;
