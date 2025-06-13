const session = require("express-session");
const fs = require("fs");
const path = require("path");
const rootDir = require("../util/path");
const Pet = require("../models/pet");
const idUtil = require("../util/id");

exports.updatePetDataAtt = (req, res) => {
  const allId = Pet.fetchAll((pets) => pets.map((pet) => pet.id));
  console.log(allId);
  const paramList = { id: idUtil.createUniqueID([]) };
  Pet.updateAllPets(paramList);
};

exports.getAllPetsData = (req, res) => {
  // all the pets
  Pet.fetchAll((pets) => {
    res.status(200).json({
      success: true,
      message: "Successful pet retrieval",
      petData: pets,
    });
  });
};
//

// Post new pet
exports.postGivePet = async (req, res) => {
  const {
    "pet-name": name,
    type: type,
    breed,
    "min-age": minAgeStr,
    "max-age": maxAgeStr,
    gender,
    "friendly-dogs": friendlyDogs,
    "friendly-cats": friendlyCats,
    "friendly-children": friendlyChildren,
    comment,
    "img-url": img_url,
    "owner-fname": ownerFname,
    "owner-lname": ownerLname,
    "owner-email": ownerEmail,
    "owner-location": location,
  } = req.body;

  const petAttributes = {
    name: name,
    type: type,
    breed: breed,
    gender: gender,
    minAge: minAgeStr,
    maxAge: maxAgeStr,
    friendlyTo: {
      children: friendlyChildren,
      dogs: friendlyDogs,
      cats: friendlyCats,
    },
    comment: comment,
    img_url: img_url,
    ownerFname: ownerFname,
    ownerLname: ownerLname,
    ownerEmail: ownerEmail,
    location: location,
  };

  const newPet = new Pet(petAttributes);
  newPet.save();

  try {
    // Await the save method, which should return a Promise
    await newPet.save();
    // Respond with success
    res.status(201).json({ message: "Pet successfully saved!", success: true });
  } catch (err) {
    // Handle any error that occurs during the save
    console.error("Error saving pet:", err);
    res.status(500).json({ error: "Failed to save pet", success: false });
  }
  //   try {
  //     const jsonData = fs.readFileSync(
  //       path.join(rootDir, "data", "pets.json"),
  //       "utf8"
  //     );
  //     const parsedJSON = JSON.parse(jsonData);
  //     // console.log(parsedJSON);
  //     if (parsedJSON.hasOwnProperty(type)) {
  //       parsedJSON[type].push(newPet);
  //     }
  //     // console.log(parsedJSON.cat);
  //     const newStringifiedData = JSON.stringify(parsedJSON, null, 2); // `null, 2` for pretty-printing the JSON

  //     fs.writeFileSync(
  //       path.join(rootDir, "data", "pets.json"),
  //       newStringifiedData,
  //       "utf8"
  //     );
  //     res
  //       .status(200)
  //       .json({ success: true, message: "Pet registered successfully" });
  //   } catch (err) {
  //     console.error("Cant retrieve pet data: ");
  //     res.status(400).json({ success: false, message: "FAILED pet retrieval" });
  //   }
};
