const Author = require("../models/author");

exports.login = (req, res) => {
  res.render("sessions/login", {
    title: "Login"
  });
};

exports.authenticate = (req, res) => {
  Author.findOne({
    email: req.body.email
  })
    .then(author => {
      author.authenticate(req.body.password, (err, isMatch) => {
        if (err) throw new Error(err);

        if (isMatch) {
          req.session.userId = author.id;
          req.flash("success", "You are logged in.");
          res.redirect("/chats/index");
        } else {
          req.flash("error", `ERROR: Your credentials do not match.`);
          res.redirect("/");
        }
      });
    })
    .catch(err => {
      req.flash("error", `ERROR: ${err}`);
      res.redirect("/");
    });
};

exports.logout = (req, res) => {
  req.session.userId = null;
  req.flash("success", "You are logged out");
  res.redirect("/");
};
