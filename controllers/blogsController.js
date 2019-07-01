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
  //req.isAuthenticated();
  console.log("addnewfriend");
  res.render("friends/new", {
    title: "Add new friend"
  });
};

exports.createfriend = (req, res) => {
  Author.findById(req.session.userId, (err, author) => {
    Author.findOne({ email: req.body.email }).then(friend => {
      console.log("before modification");
      console.log(friend);
      console.log(author);
      author.friendlist.push(friend._id);
      author.save();
      //friend.friendlist.push(author._id);
      //friend.save();
      // friend.friendlist.push(author);
      console.log("After modification");
      console.log(friend);
      console.log(author);
      res.redirect("/blogs");
    });
  });
};

//  var author = Author.findById(req.session.userId);
//  var friend = Author.findOne({ email: req.body.email });
/*
  console.log(author);
  console.log(friend);

  if (author._id != friend._id) {
    author.friendlist.push(friend);
    friend.friendlist.push(author);
  } else {
    author.friendlist.push(friend);
  }
};
*/
/*
exports.index = (req, res) => {
  req.isAuthenticated();

  Blog.find({
      author: req.session.userId
    })
    .populate('author')
    .then(blogs => {
      res.render('blogs/index', {
        blogs: blogs,
        title: 'Archive'
      });
    })
    .catch(err => {
      req.flash('error', `ERROR: ${err}`);
      res.redirect('/');
    });
};
*/
