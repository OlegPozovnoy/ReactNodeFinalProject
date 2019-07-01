const express = require("express");
const app = express();

// Import our Page Routes
const friendsRoutes = require("./routes/friends");
const authorsRoutes = require("./routes/authors");
const sessionsRoutes = require("./routes/sessions");
const chatsRoutes = require("./routes/chats");

// Register our Page Routes with our app
app.use("/friends", friendsRoutes);
app.use("/chats", chatsRoutes);
app.use("/authors", authorsRoutes);
app.use("/", sessionsRoutes);

// Export our changes
module.exports = app;
