const express = require("express");
const app = express();

// Import our Page Routes
const authorsRoutes = require("./routes/authors");
const sessionsRoutes = require("./routes/sessions");
const chatsRoutes = require("./routes/chats");

// Register our Page Routes with our app
app.use("/api/chats", chatsRoutes);
app.use("/api/authors", authorsRoutes);
app.use("/api", sessionsRoutes);

// Export our changes
module.exports = app;
