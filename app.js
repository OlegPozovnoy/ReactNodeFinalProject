require("dotenv").config();

// Mongoose
const mongoose = require("mongoose");
mongoose
  .connect(process.env.DB_URI, {
    auth: {
      user: process.env.DB_USER,
      password: process.env.DB_PASS
    },
    useNewUrlParser: true
  })
  .catch(err => console.error(`ERROR: ${err}`));
// End Mongoose

const express = require("express");
const path = require("path");

const app = express();

// Our routes
const routes = require("./routes.js");
app.use("/", routes);

// !!!Handles any requests that don't match the ones above
//app.get("*", (req, res) => {
//  res.sendFile(path.join(__dirname + "/client/build/index.html"));
//});

// Handles any requests that don't match the ones above
const root = path.join(__dirname, "/client/build");
app.use(express.static(root));
app.use((req, res, next) => {
  if (
    req.method === "GET" &&
    req.accepts("html") &&
    !req.is("json") &&
    !req.path.includes(".")
  ) {
    res.sendFile("index.html", { root });
  } else next();
});

// Adding cookies and sessions support to our app
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
app.use(cookieParser());
app.use(
  session({
    secret: process.env.secret || "bookrakacha",
    cookie: {
      maxAge: 10800000
    },
    resave: true,
    saveUninitialized: true
  })
);
app.use(flash());
app.use((req, res, next) => {
  res.locals.flash = res.locals.flash || {};
  res.locals.flash.success = req.flash("success") || null;
  res.locals.flash.error = req.flash("error") || null;

  next();
});

// Body Parser
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
// End Parser

// Our views path
//app.set("views", path.join(__dirname, "views"));
//app.set("view engine", "pug");
//app.use("/css", express.static("assets/stylesheets"));
//app.use("/js", express.static("assets/javascripts"));
//app.use("/images", express.static("assets/images"));

// Authentication helpers
/*const isAuthenticated = req => {
  return req.session && req.session.userId;
};
app.use((req, res, next) => {
  req.isAuthenticated = () => {
    if (!isAuthenticated(req)) {
      req.flash("error", "You are not permitted to do this action.");
      res.redirect("/");
    }
  };

  res.locals.isAuthenticated = isAuthenticated(req);
  next();
});
*/

// Our authentication helper
const jwt = require("jsonwebtoken");
const isAuthenticated = req => {
  const token =
    (req.cookies && req.cookies.token) ||
    (req.body && req.body.token) ||
    (req.query && req.query.token) ||
    (req.headers && req.headers["x-access-token"]);

  if (req.session.userId) return true;

  if (!token) return false;

  jwt.verify(token, "bobthebuilder", (err, decoded) => {
    if (err) return false;
    return true;
  });
};

app.use((req, res, next) => {
  req.isAuthenticated = () => isAuthenticated(req);
  next();
});
// End of our authentication helper

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on ${port}`));
