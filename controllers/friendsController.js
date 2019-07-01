const Author = require("../models/author");

exports.index = (req, res) => {
  req.isAuthenticated();

  console.log("userid:" + req.session.userId);

  Author.findOne({
    _id: req.session.userId
  })
    .then(result => {
      res.render("friends/index", {
        authors: result.friendlist,
        title: "Friends"
      });
    })
    .catch(err => {
      req.flash("error", `ERROR: ${err}`);
      res.redirect("/");
    });
};

exports.addnewfriend = (req, res) => {
  res.render("friends/new", {
    title: "Add new friend"
  });
};

exports.createfriend = (req, res) => {
  console.log(req.session);
  Author.findById(req.session.userId, (err, author) => {
    Author.findOne({ email: req.body.email }).then(friend => {
      console.log("before modification");
      console.log(friend);
      console.log(author);
      author.friendlist.addToSet(friend._id);
      author.save();
      friend.friendlist.addToSet(author._id);
      //friend.save();
      // friend.friendlist.push(author);
      console.log("After modification");
      console.log(friend);
      console.log(author);
      res.redirect("/friends");
    });
  });
};
