const express = require("express");
const session = require("express-session");
const fs = require("fs");
const path = require("path");
const rootDir = require("../util/path");

const router = express.Router();
const petsController = require("../controllers/pets");
const petsRouter = express.Router();

petsRouter.get("/", petsController.getAllPetsData);
petsRouter.post("/", petsController.postGivePet);

petsRouter.get("/api/attribute", petsController.updatePetDataAtt);

router.use("/accounts", petsRouter);

// router.get("/petsData", petsController.);

module.exports = router;
