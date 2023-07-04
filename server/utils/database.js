const mongoose = require("mongoose");
const dbConfig = require("../config/db.config");

/**
 * DB Connection initialization
 */

module.exports = function () {
  mongoose.connect(dbConfig.DB_URL);
  const db = mongoose.connection;
  db.on("error", () => {
    console.log("error while connecting to DB");
  });
  db.once("open", () => {
    console.log("connected to Mongo DB ");
  });
};
