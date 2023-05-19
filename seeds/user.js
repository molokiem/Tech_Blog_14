const { User } = require("../models");

const UserData = [
  {
    username: "JohnDoe",
    password: "Secret123",
  },
  {
    username: "JaneDoe",
    password: "Secret321",
  },
];

const seedUser = () => User.bulkCreate(UserData);

module.exports = seedUser;
