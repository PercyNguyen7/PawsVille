const express = require("express");
const session = require("express-session");
const path = require("path");
const app = express();
const fs = require("node:fs");
const PORT = process.env.port || 3000;

// const db = require("./util/database");

const helmet = require("helmet");
// const compression = require("compression");
// const morgan

const shopRoutes = require("./routes/shop.js");
const userRoutes = require("./routes/users.js");
const petsRoutes = require("./routes/pets.js");

// ************ MIDLEWARE ***************************
// Helmet middleware for secure responses
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", "*"],
      // Add other directives as needed
    },
  })
);
// app.use(compression());
// SESSION middleware
app.use(
  session({
    name: "cookie",
    resave: false,
    secret: "12345678", // Secret key used to sign the session ID cookie
    saveUninitialized: true, // Save a session that is new but not modified
    cookie: { secure: false, httpOnly: false },
  })
);

// Middleware to make new username variable for ejs templates to render
app.use((req, res, next) => {
  if (req.session.username) {
    res.locals.username = req.session.username; // Make username available in all templates
  }
  next();
});

// middleware used to parse incoming requests with application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// middleware to parse json files
app.use(express.json());

// middleware to serve static data from public folder
app.use(express.static(path.join(__dirname, "./public")));

// ************ EXPRESS CONFIGURATION ***************************
// Set view engine of express to ejs
app.set("view engine", "ejs");

//Set views to
app.set("views", path.join(__dirname, "./views"));

// ************************* Routes *************************
app.use(shopRoutes);
app.use(userRoutes);
app.use(petsRoutes);

// db.execute("SELECT * FROM pets")
//   .then((res) => {
//     console.log(res[0], res[1]);
//   })
//   .catch((err) => console.log(err));

app.use((req, res) => {
  res.status(400).render("404", { username: req.session.username });
});

app.listen(PORT, (err) => {
  if (err) console.error("error is:" + err);
  console.log(`Server is running on localhost:${PORT}`);
});
