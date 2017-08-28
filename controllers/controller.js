// require npm express
var express = require("express");
// router method of express npm
var router = express.Router();
// Import news model to use its database functions.
var newsaddict = require("../models/news_addict.js");
// Create routes/set up logic within routes
router.get("/", function(req, res) {
  newsaddict.all(function(data) {
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    // index.handlebars
    res.render("index", hbsObject);
  });
});

router.post("/", function(req, res) {
  // create new record
  newsaddict.create([
    "burger_name", "devoured"
  ], [
  // get burger name and devoured from body object
    req.body.burger_name, req.body.devoured
  ], function() {
    // redirect back to root page
    res.redirect("/");
  });
});
// update record
router.put("/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  newsaddict.update({
    devoured: req.body.devoured
  }, condition, function() {
    res.redirect("/");
  });
});

router.delete("/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  newsaddict.delete(condition, function() {
    res.redirect("/");
  });
});

// Export routes for server.js to use.
module.exports = router;
