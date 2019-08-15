const Author = require("../models/author");
const jwt = require("jsonwebtoken");

exports.login = (req, res) => {
  res.render("sessions/login", {
    title: "Login"
  });
};

exports.authenticate = (req, res) => {
  console.log("authenticate", req.body);
  Author.findOne({
    email: req.body.email
  })
    .then(author => {
      author.authenticate(req.body.password, (err, isMatch) => {
        if (err) throw new Error(err);

        if (isMatch) {
          console.log("isMatch: ", author.id);
          req.session.userId = author.id;

          const token = jwt.sign({ payload: req.body.email }, "bobthebuilder", {
            expiresIn: "1h"
          });
          res
            .cookie("token", token, { httpOnly: true })
            .status(201)
            .send({
              message: "You were authenticated you wonderful human.",
              uid: author.id
            });
        } else {
          console.log("Not a match", err);
          res.status(401).json(err);
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(401).json(err);
    });
};

exports.logout = (req, res) => {
  console.log("logout isAuth:", req.isAuthenticated(), req.isAuthenticated);
  if (!req.isAuthenticated()) {
    console.log("not auth");
    res.status(401).send({ error: "Could not authenticate" });
  } else {
    console.log("auth");
    req.session.userId = null;
    res
      .clearCookie("token")
      .clearCookie("uid")
      .status(200)
      .send({ success: "You are now logged out" });
  }
};
