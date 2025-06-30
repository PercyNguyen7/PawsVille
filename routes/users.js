const express = require("express");
const session = require("express-session");
const fs = require("fs");
const path = require("path");
const rootDir = require("../util/path");
const userController = require("../controllers/users");

const router = express.Router();
const accountsRouter = express.Router();

accountsRouter.post("/logout", userController.postLogout);

// in between post request for user creating an account
accountsRouter.post("/create", userController.postCreatingAccount);

accountsRouter.post("/sign-in", userController.postSigningIn);

router.use("/accounts", accountsRouter);
module.exports = router;
