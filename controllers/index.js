const router = require("express").Router();
const apiRoutes = require("./api");
const { BlogPost, User, Comment } = require("../models");

router.get("/", async (req, res) => {
  const results = await BlogPost.findAll({
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
  });

  const data = results.map((post) => post.get({ plain: true }));
  console.log(req.session.user_id);
  if (req.session.username) {
    const user = await User.findOne({
      where: {
        username: req.session.username,
      },
      attributes: ["username"],
    });

    return res.render("landing", {
      data,
      logged_in: req.session.logged_in,
      user,
    });
  }

  res.render("landing", {
    data,
  });
});

router.get("/post/:id", async (req, res) => {
  const results = await BlogPost.findByPk(req.params.id, {
    include: Comment,
  });
  const post = results.get({
    plain: true,
  });

  return res.render("blogpost", {
    logged_in: req.session.logged_in,

    ...post,
  });
});

router.get("/newpost", (req, res) => {
  res.render("newpost");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.use("/api", apiRoutes);

function myMiddleware(req, res, next) {
  res.send("<h1>Wrong Route!</h1>");
}

router.use(myMiddleware);

module.exports = router;
