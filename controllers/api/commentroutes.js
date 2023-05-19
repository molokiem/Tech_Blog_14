const express = require("express");
const router = express.Router();
const { Comment, BlogPost, User } = require("../../models");

// Get all comments
router.get("/", async (req, res) => {
  try {
    const comments = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve comments." });
  }
});

// Get a specific comment by ID
router.get("/:id", async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    if (!comment) {
      return res.status(404).json({ error: "Comment not found." });
    }

    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve the comment." });
  }
});

// Create a new comment
router.post("/", async (req, res) => {
  try {
    const { content, blogPostId } = req.body;

    const comment = await Comment.create({
      contents: content,
      username: req.session.username,
      blog_id: blogPostId,
    });

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: "Failed to create the comment." });
  }
});

// Update a comment
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedComment = await Comment.update(req.body, {
      where: {
        id: id,
      },
    });

    if (updatedComment[0] === 0) {
      return res.status(404).json({ error: "Comment not found." });
    }

    res.json({ message: "Comment updated successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to update the comment." });
  }
});

// Delete a comment
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCommentCount = await Comment.destroy({
      where: {
        id: id,
      },
    });

    if (deletedCommentCount === 0) {
      return res.status(404).json({ error: "Comment not found." });
    }

    res.json({ message: "Comment deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the comment." });
  }
});

module.exports = router;
