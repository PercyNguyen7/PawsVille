const express = require("express");
// const session = require("express-session");
// const fs = require("fs");
// const path = require("path");
// const rootDir = require("../util/path");

const router = express.Router();
const petsController = require("../controllers/pets");

router
  .route("/")
  .get(petsController.getAllPetsData)
  .post(petsController.postGivePet);

// router.post("/api/attribute", petsController.updatePetDataAtt);

module.exports = router;
