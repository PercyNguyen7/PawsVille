const express = require("express");
const session = require("express-session");
const fs = require("fs");
const path = require("path");
const rootDir = require("../util/path");
const userController = require("../controllers/users");

const router = express.Router();

router.post("/logout", userController.postLogout);

// in between post request for user creating an account
router.post("/creating-account", userController.postCreatingAccount);

router.post("/signing-in", userController.postSigningIn);
module.exports = router;
