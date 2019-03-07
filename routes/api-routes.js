// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
var Useer = require("../models");
module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json("/members");
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    console.log(req.body);
    db.User.create({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
      weight: req.body.weight,
      age: req.body.age,
    }).then(function() {
      res.redirect(307, "/api/login");
    }).catch(function(err) {
      console.log(err);
      res.json(err);
      // res.status(422).json(err.errors[0].message);
    });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    }
    else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id,
        name: req.user.name,
        weight: req.user.weight,
        age: req.user.age,
        
      });
    }
  });
  app.put("/api/posts", function(req, res) {
    db.User.update(req.body,
      {
        where: {
          id: req.user.name
        }
      })
      .then(function(dbUser) {
        res.json(dbUser);
      });
  });
   // GET route for getting all of the todos
   app.get("/api/todos", function(req, res) {
    // finTododAll returns all entries for a table when used with no options
    db.User.findAll({}).then(function(dbUser) {
      // We have access to the todos as an argument inside of the callback function
      res.json(dbUser);
    });
  });

  // POST route for saving a new todo
  app.post("/api/todos", function(req, res) {
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property
    db.User.create({
      text: req.body.text,
      complete: req.body.complete
    }).then(function(dbUser) {
      // We have access to the new todo as an argument inside of the callback function
      res.json(dbUser);
    });
  });

  // DELETE route for deleting todos. We can get the id of the todo to be deleted from
  // req.params.id
  app.delete("/api/todos/:id", function(req, res) {
    // We just have to specify which todo we want to destroy with "where"
    db.User.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });

  });

  // PUT route for updating todos. We can get the updated todo data from req.body
  // app.put("/api/update", function(req, res) {
  //   // Update takes in an object describing the properties we want to update, and
  //   // we use where to describe which objects we want to update
  //   db.User.update({
  //     name: req.body.name,
  //     weight: req.body.weight,
  //     age: req.body.age,

  //   }, {
  //     where: {
  //       email: req.body.email
  //     }
  //   }).then(function(dbUser) {
  //     res.json(dbUser);
  //   });
  // });
  // app.post("/api/update", function(req,res) {
  //   console.log(req);
  //   db.User.update(req.body,
  //     {
  //       where: {
  //         email: req.body.email
  //       }
  //   }).then(function(results) {
  //     res.json(results);
  //     res.redirect("/members");
  //   })
  
  // });
  app.put("/api/update", function(req, res) {
    console.log(req.body);
    db.User.update(req.body,
      {
        where: {
          email: req.user.email
        }
      })
      .then(function(dbUser) {
        res.json(dbUser);
      });
  }); 

 
};
