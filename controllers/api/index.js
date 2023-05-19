const router = require("express").Router();
const blogPostRoutes = require("./blogroutes");
const userRoutes = require("./userroutes");
const commentRoutes = require("./commentroutes");

router.use("/blogposts", blogPostRoutes);
router.use("/users", userRoutes);
router.use("/comments", commentRoutes);

module.exports = router;
