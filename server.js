const express = require("express");
const PORT = process.env.PORT || 3000;
const session = require("express-session");
const { engine } = require("express-handlebars");
const db = require("./config/connection");
const controllers = require("./controllers/api");

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine(
  "hbs",
  engine({
    extname: ".hbs",
  })
);

app.set("view engine", "hbs");

app.use(
  session({
    secret: "process.env.SESSION_SECRET",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(controllers);

db.sync().then(() => {
  app.listen(PORT, () => console.log("Server started on port %s", PORT));
});
