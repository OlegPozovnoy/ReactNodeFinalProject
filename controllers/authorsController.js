const Author = require("../models/author");

exports.new = (req, res) => {
  res.render("authors/new", {
    title: "New Author"
  });
};

exports.create = (req, res) => {
  Author.create(req.body.author)
    .then(() => {
      res.status(200).send({ success: "You are registered" });
    })
    .catch(err => res.status(503).send(err));
};
