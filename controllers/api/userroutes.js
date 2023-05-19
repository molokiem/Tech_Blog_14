const express = require("express");
const router = express.Router();
const { User, BlogPost } = require("../../models");

// Get all users with associated blog posts
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: BlogPost,
          attributes: ["id", "username", "contents", "title"],
        },
      ],
    });

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve users." });
  }
});

// Get a specific user by username with associated blog posts
router.get("/:username", async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.params.username,
      },
      include: [
        {
          model: BlogPost,
          attributes: ["username", "contents", "title"],
        },
      ],
    });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve the user." });
  }
});

// Create a new user
router.post("/", async (req, res) => {
  try {
    const newUser = await User.create(req.body);

    req.session.save(() => {
      req.session.username = newUser.username;
      req.session.logged_in = true;

      res.json(newUser);
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to create the user." });
  }
});

// User sign up
router.post("/signup", async (req, res) => {
  try {
    const formData = req.body;

    if (formData.password.length < 8 || formData.password.length > 30) {
      throw new Error("Password needs to be a minimum of 8 characters");
    }

    const user = await User.create(formData);

    req.session.save(() => {
      req.session.username = user.username;
      req.session.logged_in = true;
      res.redirect("/");
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

// User login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({
      where: {
        username: username,
      },
    });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (password !== user.password) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    req.session.save(() => {
      req.session.username = user.username;
      req.session.logged_in = true;

      res.json(user);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to log in." });
  }
});

// User logout
router.get("/logout", async (req, res) => {
  req.session.destroy(() => {
    console.log("Logged out");
    res.redirect("/");
  });
});

// Update a user
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.update(req.body, {
      where: {
        id: id,
      },
    });

    if (updatedUser[0] === 0) {
      return res.status(404).json({ error: "User not found." });
    }

    res.json({ message: "User updated successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to update the user." });
  }
});

// Delete a user
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUserCount = await User.destroy({
      where: {
        id: id,
      },
    });

    if (deletedUserCount === 0) {
      return res.status(404).json({ error: "User not found." });
    }

    res.json({ message: "User deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the user." });
  }
});

module.exports = router;
