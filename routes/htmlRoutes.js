var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Destination.findAll({}).then(function(dbDestinations) {
      res.render("index", {
        msg: "Check out these fresh spots!",
        destinations: dbDestinations
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/destination/:id", function(req, res) {
    db.Destination.findOne({ where: { id: req.params.id } }).then(function(dbDestination) {
      res.render("example", {
        destinations: dbDestination
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
