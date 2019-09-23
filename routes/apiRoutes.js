var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/destinations", function(req, res) {
    db.Destination.findAll({}).then(function(dbDestinations) {
      res.json(dbDestinations);
    });
  });

  // Create a new example
  app.post("/api/destinations", function(req, res) {
    db.Destination.create(req.body).then(function(dbDestination) {
      res.json(dbDestination);
    });
  });

  // Delete an example by id
  app.delete("/api/destinations/:id", function(req, res) {
    db.Destination.destroy({ where: { id: req.params.id } }).then(function(dbDestination) {
      res.json(dbDestination);
    });
  });
};
