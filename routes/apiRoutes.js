var db = require("../models");
let destinations = require("../models/vacations");

module.exports = function (app) {
  // Get all examples
  app.get("/api/destinations", function (req, res) {
    db.Destination.findAll({}).then(function (dbDestinations) {
      res.json(dbDestinations);
    });
  });

  // Create a new example
  app.post("/api/destinations", function (req, res) {
    db.Destination.create(req.body).then(function (dbDestination) {
      res.json(dbDestination);
    });
    let yourMatch = {
      name: "",
      photo: "",
      destinationsDiff: 1000
    };

    // variables to get the results of users survey
    let userInfo = req.body;
    let userScore = userInfo.scores;
    let userName = userInfo.name;
    let userPhoto = userInfo.photo;

    // variable for difference of scores
    let totalDifference = 0;

    // loop to get destinations scores
    for (var i = 0; i < destinations.length - 1; i++) {
      console.log(destinations[i].name);
      totalDifference = 0;

      // loop for difference between scores
      for (var j = 0; j < 10; j++) {
        totalDifference += Math.abs(parseInt(userScore[j]) - parseInt(destinations[i].scores[j]));

        if (totalDifference <= yourMatch.destinationsDiff) {

          yourMatch.name = destinations[i].name;
          yourMatch.photo = destinations[i].photo;
          yourMatch.destinationDiff = totalDifference;
        }
      }
    }
    // push method for data
    destinations.push(userInfo);

    res.json(yourMatch);
  });

  // Delete an example by id
  app.delete("/api/destinations/:id", function (req, res) {
    db.Destination.destroy({ where: { id: req.params.id } }).then(function (dbDestination) {
      res.json(dbDestination);
    });
  });
};
