const Chat = require("../models/chat");
const Message = require("../models/message");
const Author = require("../models/author");

exports.new = (req, res) => {
  req.isAuthenticated();

  res.render("chats/new", {
    title: "New chat"
  });
};

exports.create = (req, res) => {
  console.log("Create:");
  console.log(req.body.chat_id);
  req.isAuthenticated();

  let chat;
  if (req.body.chat_id) {
    Chat.findOne({ _id: req.body.chat_id }, (err, res) => {
      console.log("HAHAHA");
      console.log(res);
      res.name = req.body.name;
      res.authors = [{ _id: req.session.userId }];
      res.save();
    }).then(() => {
      res.redirect("index");
    });
  } else {
    chat = new Chat({
      name: req.body.name,
      authors: [{ _id: req.session.userId }]
    });
    chat.save();
    res.redirect("index");
  }
};

exports.index = (req, res) => {
  req.isAuthenticated();
  console.log(req.session.userId);
  Chat.find({ authors: { $in: [req.session.userId] } }).then(chats => {
    console.log("Result");
    console.log(chats);
    res.render("chats/index", {
      chats: chats,
      title: "Chat list"
    });
  });
};

exports.destroy = (req, res) => {
  req.isAuthenticated();

  Chat.deleteOne({
    _id: req.body.id
  })
    .then(() => {
      req.flash("success", "The chat was deleted successfully.");
      res.redirect("/chats/index");
    })
    .catch(err => {
      req.flash("error", `ERROR: ${err}`);
      res.redirect(`/chats`);
    });
};

exports.show = (req, res) => {
  req.isAuthenticated();

  console.log("Show");
  console.log(req.params.id);

  Chat.findOne({
    _id: req.params.id
  })
    .populate("messages")
    .populate("authors")
    .populate({
      path: "messages",
      // Get friends of friends - populate the 'friends' array for every friend
      populate: { path: "author" }
    })
    .then(chat => {
      console.log(chat);

      res.render("messages/index", {
        authors: chat.authors,
        messages: chat.messages,
        chat_id: req.params.id,
        name: chat.name,
        user_id: req.session.userId
      });
    });
};

exports.addnewmessage = (req, res) => {
  req.isAuthenticated();

  console.log("Request");
  console.log(req.body);

  Chat.findOne({
    _id: req.body.message.chat_id
  })
    .then(chat => {
      let message = new Message({
        content: req.body.message.text,
        author: req.session.userId
      });

      message.save();

      chat.messages.push(message);
      chat.save();
    })
    .then(() => {
      res.redirect(`${req.body.message.chat_id}`);
    });
};

exports.addnewparticipant = (req, res) => {
  req.isAuthenticated();

  console.log("Request");
  console.log(req.body);

  Chat.findOne({
    _id: req.body.chat_id
  })
    .then(chat => {
      Author.findOne({ email: req.body.email }, (err, res) => {
        if (err) {
          req.flash("error", `ERROR: ${err}`);
          res.redirect(`${req.body.chat_id}`);
        }

        console.log("FindOne");
        console.log(chat);
        console.log(res);
        chat.authors.addToSet(res);
        chat.save();
      }).then(() => {
        res.redirect(`${req.body.chat_id}`);
      });
    })
    .catch(err => {
      req.flash("error", `ERROR: ${err}`);
      res.redirect(`${req.body.chat_id}`);
    });
};

exports.leavechat = (req, res) => {
  req.isAuthenticated();

  console.log("Request");
  console.log(req.body);

  Chat.findOne({
    _id: req.body.leave.chat_id
  })
    .then(chat => {
      Author.findOne({ _id: req.session.userId }, (err, res) => {
        if (err) {
          req.flash("error", `ERROR: ${err}`);
          res.redirect(`${req.body.chat_id}`);
        }
        console.log("FindOne");
        console.log(chat);
        console.log(res);
        chat.authors.pull(res);
        chat.save();
      }).then(() => {
        res.redirect("index");
      });
    })
    .catch(err => {
      req.flash("error", `ERROR: ${err}`);
      res.redirect(`${req.body.chat_id}`);
    });
};

exports.messageupdate = (req, res) => {
  req.isAuthenticated();

  console.log("Request");
  console.log(req.body);

  Message.findOne({ _id: req.body.change.messageId }, (err, res) => {
    if (err) {
      req.flash("error", `ERROR: ${err}`);
      res.redirect(`${req.body.chat_id}`);
    }

    if (res.status === "visible") res.status = "deleted";
    else res.status = "visible";

    res.save();
    console.log(res);
  }).then(() => {
    res.redirect(`${req.body.change.chatId}`);
  });
};

exports.edit = (req, res) => {
  Chat.findById(req.params.id)
    .then(chat => {
      res.render("chats/edit", {
        title: `Edit ${chat.name}`,
        chat: chat
      });
    })
    .catch(err => {
      console.error(`ERROR: ${err}`);
    });
};
