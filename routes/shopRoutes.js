// Routes reachable for users
const express = require("express");
const session = require("express-session");
const fs = require("fs");
const path = require("path");
const rootDir = require("../util/path");

const router = express.Router();
const shopController = require("../controllers/shop");
router.use(
  session({
    name: "cookie",
    resave: false,
    secret: "12345678", // Secret key used to sign the session ID cookie
    saveUninitialized: true, // Save a session that is new but not modified
    cookie: { secure: false, httpOnly: false },
  })
);

// Browse route fetch the data and render browsePet according to petJS
router.get("/browse", shopController.getBrowse);

// Route "/petInfo"
router.get("/pets/:type/:nameAndId", shopController.getPetDetail);

// Routes "/" and "/home" all lead to /
router.get("/", (req, res) => {
  res.render("./shop/home", { username: req.session.username });
});

// Route "/"
router.get("/home", (req, res) => {
  res.redirect("/");
});

// Render the page according to
router.get("/:page", shopController.getAllPages);

module.exports = router;
