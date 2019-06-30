const Author = require("../models/author");

exports.new = (req, res) => {
  res.render("authors/new", {
    title: "New Author"
  });
};

exports.create = (req, res) => {
  Author.create(req.body.author)
    .then(() => {
      req.flash("success", "You are now registered");
      res.redirect("/");
    })
    .catch(err => {
      req.flash("error", `ERROR: ${err}`);
      res.redirect("/authors/new");
    });
};
