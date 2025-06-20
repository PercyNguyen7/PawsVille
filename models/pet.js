//Define the data representation of a pet
const fs = require("fs");

const path = require("path");
const rootDir = require("../util/path");
const dataPath = path.join(rootDir, "data", "pets.json");
const idUtil = require("../util/id");

//getPetsFromFile return
const getPetsFromFile = (cb, filterParams = null) => {
  fs.readFile(dataPath, (err, jsonData) => {
    if (err) {
      console.error("Cant retrieve pet data: ");
      cb([]);
    } else {
      const parsedData = JSON.parse(jsonData);
      if (filterParams) {
        const filteredData = filterPets(parsedData, filterParams);
        cb(filteredData);
      } else {
        cb(parsedData);
      }
    }
  });
};

// filterPets filter out the array of pets type to pets that match params requirement
const filterPets = function (petsData, params) {
  console.log(params);
  if (petsData.hasOwnProperty(params.type)) {
    const animalArr = petsData[params.type];

    if (params.type == "dog") {
      params.breed = params.dogBreed;
    } else if (params.type == "cat") {
      params.breed = params.catBreed;
    }

    return animalArr.filter((animal) => {
      return (
        //  Testing for breed or breed is all
        (animal.breed === params.breed ||
          params.breed === `all-${params.type}`) &&
        // Testing for age
        (params.minAge <= animal.age || params.minAge == "") &&
        (params.maxAge >= animal.age || params.maxAge == "") &&
        //Testing for gender
        (params.gender === animal.gender ||
          params.gender === "Either" ||
          params.gender == undefined) &&
        // Testing for friendliness
        ((params.friendlyTo.children && animal.friendlyTo.children) ||
          params.friendlyTo.children === undefined) &&
        ((params.friendlyTo.dogs && animal.friendlyTo.dogs) ||
          params.friendlyTo.dogs === undefined) &&
        ((params.friendlyTo.cats && animal.friendlyTo.cats) ||
          params.friendlyTo.cats === undefined)
      );
    });
  }
};
const decapitalizeStr = function (str) {
  if (str.length > 0) str = str[0].toLowerCase() + str.slice(1);
  return str;
};
const capitalizeStr = function (str) {
  if (str.length > 0) str = str[0].toUpperCase() + str.slice(1);
  return str;
};
const getFriendlinessStr = function (animal) {
  if (
    animal.friendlyTo.children &&
    animal.friendlyTo.dogs &&
    animal.friendlyTo.cats
  ) {
    return "Friendly";
  } else {
    let dislikeStr = "";
    if (!animal.friendlyTo.children) {
      dislikeStr += (!dislikeStr ? "" : ", ") + "children";
    }
    if (!animal.friendlyTo.dogs) {
      dislikeStr += (!dislikeStr ? "" : ", ") + "dogs";
    }
    if (!animal.friendlyTo.cats) {
      dislikeStr += (!dislikeStr ? "" : ", ") + "cats";
    }
    return `Dislike ${dislikeStr}`;
  }
};
module.exports = class Pet {
  constructor({
    name,
    type,
    breed,
    gender,
    minAge,
    maxAge,
    friendlyTo = {},
    comment = "",
    img_url = "",
    ownerFname,
    ownerLname,
    ownerEmail,
    location,
  }) {
    this.name = name;
    this.type = capitalizeStr(type);
    this.breed = breed;
    this.gender = gender;
    this.minAge = Number(minAge);
    this.maxAge = Number(maxAge);
    this.age = Math.round((minAge + maxAge) / 2);
    this.friendlyTo = {
      children: friendlyTo.children ?? false,
      dogs: friendlyTo.dogs ?? false,
      cats: friendlyTo.cats ?? false,
    };
    this.friendlyToStr = getFriendlinessStr(this);
    this.comment = comment;
    this.img_url = img_url;
    this.ownerFname = ownerFname;
    this.ownerLname = ownerLname;
    this.ownerEmail = ownerEmail;
    this.location = location;
  }
  // save() {
  //   getPetsFromFile((pets) => {
  //     pets[decapitalizeStr(this.type)].push(this);
  //     fs.writeFile(dataPath, JSON.stringify(pets), (err) => {
  //       console.log(err);
  //     });
  //   });
  // }
  save() {
    return new Promise((resolve, reject) => {
      getPetsFromFile((pets) => {
        pets[decapitalizeStr(this.type)].push(this);
        fs.writeFile(dataPath, JSON.stringify(pets), (err) => {
          if (err) {
            console.log("Error saving pet data:", err);
            reject(err); // Reject promise with error
          } else {
            console.log("Pet data saved successfully");
            resolve(); // Resolve promise when successful
          }
        });
      });
    });
  }
  //
  static saveAllPets(newPetObj) {
    // getPetsFromFile((pets) => {
    // Write new pets
    // pets[decapitalizeStr(this.type)] = newPets;
    fs.writeFile(dataPath, JSON.stringify(newPetObj), (err) => {
      console.log(err);
    });
    // });
  }

  //
  static saveSomePets(newPets) {
    getPetsFromFile((pets) => {
      // Write new pets
      pets[decapitalizeStr(this.type)] = newPets;
      fs.writeFile(dataPath, JSON.stringify(pets), (err) => {
        console.log(err);
      });
    });
  }
  static fetchAllIDs(cb) {
    getPetsFromFile((petData) => {
      const idArr = [];
      for (const petType in petData) {
        petData[petType].forEach((pet) => {
          idArr.push(pet.id);
        });
      }
      cb();
    });
  }
  //
  static fetchAll(cb) {
    getPetsFromFile(cb);
  }

  //Fetch some animals based on parameters
  static fetchSome(cb, paramList) {
    getPetsFromFile(cb, paramList);
  }

  static fetchById(cb, type, id) {
    getPetsFromFile((pets) => {
      const petFound = pets[type]?.find((p) => p.id === id);
      cb(petFound);
    });
  }

  // add new key value to each current entry
  static updateAllPets(newKeyValObj) {
    //
    Pet.fetchAll((petsObj) => {
      // console.log(petsObj);
      // Update all pets' attributes
      const newPetObj = {};
      // For each pet type
      for (const petType in petsObj) {
        const updatedPetType = petsObj[petType].map((pet) => {
          for (const [key, val] of Object.entries(newKeyValObj)) {
            console.log(pet);
            pet.id = idUtil.createUniqueID([]);
          }
          return pet;
        });
        console.log(updatedPetType);
        newPetObj[petType] = updatedPetType;
      }
      Pet.saveAllPets(newPetObj);
    });
  }
};
