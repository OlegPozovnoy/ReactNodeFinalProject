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
  if (!req.isAuthenticated())
    return res.status(401).send({ error: "User is not authenticated" });

  console.log("Create:");

  if (req.body.chat_id) {
    Chat.findOne({ _id: req.body.chat_id }, (err, res) => {
      console.log("updating chat for: ", req.body.chat_id);
      console.log(res.body);
      res.name = req.body.name;
      res.authors = [{ _id: req.session.userId }];
      res.save();
    })
      .then(() => res.status(201).send({ success: "Chat was updated" }))
      .catch(err => res.status(400).send(err));
  } else {
    console.log("creating the chat for: ", req.session.userId);
    Chat.create({
      name: req.body.name,
      authors: [{ _id: req.session.userId }]
    })
      .then(() => res.status(201).send({ success: "Chat was created" }))
      .catch(err => res.status(503).send(err));
  }
};

exports.index = (req, res) => {
  console.log("chats.index:");
  //req.isAuthenticated();
  Chat.find({ authors: { $in: [req.session.userId] } })
    .then(chats => {
      console.log("Chatlist response", chats);
      return res.json(chats);
    })
    .catch(err => res.status(503).send(err));
};

exports.destroy = (req, res) => {
  if (!req.isAuthenticated())
    return res.status(401).send({ error: "User is not authenticated" });

  console.log("Destroy:", req.body.id);

  Chat.deleteOne({
    _id: req.body.id
  })
    .then(() => res.status(200).send({ success: "Deleted successfully." }))
    .catch(err => res.status(503).send(err));
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
      console.log("Chatlist response", chat);
      return res.json(chat);
    })
    .catch(err => res.status(503).send(err));
};

exports.addnewmessage = (req, res) => {
  if (!req.isAuthenticated())
    return res.status(401).send({ error: "User is not authenticated" });

  console.log("Request", req.body);
  console.log("chat_id", req.body.chat_id);

  Chat.findOne({
    _id: req.body.chat_id
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
    .then(() =>
      res.status(201).send({ success: "Message added successfully." })
    )
    .catch(err => res.status(503).send(err));
};

exports.addnewparticipant = (req, res) => {
  if (!req.isAuthenticated())
    return res.status(401).send({ error: "User is not authenticated" });

  console.log("Request");
  console.log(req.body);

  Chat.findOne({
    _id: req.body.chat_id
  })
    .then(chat => {
      console.log("chat to modify", chat);
      Author.findOne({ email: req.body.email }, (err, res) => {
        console.log("email:", req.body.email);
        console.log("FindOne");
        console.log(chat);
        console.log(res);
        chat.authors.addToSet(res);
        chat.save();
      }).catch(err => res.status(503).send(err));
    })
    .then(() =>
      res.status(201).send({ success: "New participant added successfully." })
    )
    .catch(err => res.status(503).send(err));
};

exports.leavechat = (req, res) => {
  if (!req.isAuthenticated())
    return res.status(401).send({ error: "User is not authenticated" });

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
        res.status(201).send({ success: "You've left the chat." });
      });
    })
    .catch(err => res.status(503).send(err));
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
