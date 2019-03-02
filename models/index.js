// Dependencies
// =============================================================
// var DataTypes = require('sequelize/lib/data-types');
// This may be confusing but here Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
var sequelize = require("../config/connection.js");

// Creates a "Chirp" model that matches up with DB
var db = sequelize.define("User info", {
  // id: {
  //   primaryKey: true,
  //   type: Sequelize.INTEGER,
  //   allowNull: false
  // },
  name: Sequelize.STRING,
  age: Sequelize.INTEGER,
  weight: Sequelize.INTEGER,
  height: Sequelize.INTEGER,
  gender: Sequelize.STRING
});
console.log("User on index.js");
console.log(db);
// Syncs with DB
db.sync();

// Makes the Chirp Model available for other files (will also create a table)
module.exports = db;