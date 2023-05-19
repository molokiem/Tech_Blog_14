const Sequelize = require("sequelize");
require("dotenv");

let connection;

if (process.env.JAWDB_URL) {
  connection = new Sequelize(process.env.JAWDB_URL);
} else {
  connection = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
      host: "localhost",
      dialect: "mysql",
    }
  );
}

module.exports = connection;
