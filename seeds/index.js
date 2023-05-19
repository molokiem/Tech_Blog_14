const bpSeed = require("./blogpost");
const userSeed = require("./user");

const sequelize = require("../config/connection");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log("DATABASE SYNC SUCCESS");
  await userSeed();
  console.log("USER SEED SUCCESS");
  await bpSeed();
  console.log("BLOGPOST SEED SUCCESS");

  process.exit(0);
};

seedAll();
