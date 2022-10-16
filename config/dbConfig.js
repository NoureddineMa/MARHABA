const mongoose = require("mongoose");

const { DB_CONNECT } = process.env;

exports.connect = () => {
  // Connecting to the database
  mongoose
    .connect(DB_CONNECT, {
      useNewUrlParser: true
    })
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error) => {
      console.log("database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });
};