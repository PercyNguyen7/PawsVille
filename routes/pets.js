const express = require("express");
const session = require("express-session");
const fs = require("fs");
const path = require("path");
const rootDir = require("../util/path");

const router = express.Router();
const petsController = require("../controllers/pets");

router.get("/get_all_pets_data", petsController.getAllPetsData);
router.post("/givePet", petsController.postGivePet);

router.get("/updatePetDataAtt", petsController.updatePetDataAtt);

// router.get("/petsData", petsController.);

//st
module.exports = router;
