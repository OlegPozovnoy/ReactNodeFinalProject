const Author = require("../models/author");

exports.new = (req, res) => {
  res.render("authors/new", {
    title: "New Author"
  });
};

exports.create = (req, res) => {
  Author.findOne({ email: req.body.author.email }, function(err, result) {
    if (result == undefined) {
      console.log("if undefined");
      Author.create(req.body.author)
        .then(() => {
          res
            .status(200)
            .send({ status: "success", message: "You are registered" });
        })
        .catch(err =>
          res
            .status(200)
            .send({ status: "danger", message: "Something went wrong" })
        );
    } else {
      console.log("else");
      res.status(200).send({ status: "danger", message: "Username is taken" });
    }
  });
};

exports.checkusername = (req, res) => {
  console.log("checkusername", req.body.author.email);
  Author.findOne({ email: req.body.author.email }, function(err, result) {
    console.log("result", result);
    console.log("res", res.body);
    if (result)
      res.status(200).send({ status: "danger", message: "username is taken" });
    else
      res
        .status(200)
        .send({ status: "success", message: "username is available" });
  });
};
