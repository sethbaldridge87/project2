var db = require("../models/index.js");

module.exports = function(app) {
  // Get all examples
  app.get("/api/all", function(req, res) {
    console.log("Log a db at top of api/all");
    console.log(db);

    // Finding all Chirps, and then returning them to the user as JSON.
    // Sequelize queries are asynchronous, which helps with perceived speed.
    // If we want something to be guaranteed to happen after the query, we'll use
    // the .then function
    db.findAll({}).then(function(results) {
      // results are available to us inside the .then
      res.json(results);
      console.log("Results here:");
      console.log(results);
    });

  });
  // Create a new user
  app.post("/api/new", function(req,res) {
    db.create({
      name: req.body.name,
      age: req.body.age,
      weight: req.body.weight,
      height: req.body.height,
      gender: req.body.gender
    }).then(function(results){
      res.json(results);
    });
  });

  // Delete a user by id
  app.delete("/api/delete/:id", function(req, res) {
    db.destroy({
      where: { 
        id: req.params.id 
      } 
    }).then(function(results){
      res.json(results);
    });
  });


};
