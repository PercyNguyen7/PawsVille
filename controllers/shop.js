const session = require("express-session");
const fs = require("fs");
const path = require("path");
const rootDir = require("../util/path");
const Pet = require("../models/pet");
const idUtil = require("../util/id");

exports.getBrowse = (req, res) => {
  // const getFriendllinessStr = function (animal) {
  //   if (
  //     animal.friendlyTo.children &&
  //     animal.friendlyTo.dogs &&
  //     animal.friendlyTo.cats
  //   ) {
  //     return "Friendly";
  //   } else {
  //     let dislikeStr = "";
  //     if (!animal.friendlyTo.children) {
  //       dislikeStr += (!dislikeStr ? "" : ", ") + "children";
  //     }
  //     if (!animal.friendlyTo.dogs) {
  //       dislikeStr += (!dislikeStr ? "" : ", ") + "dogs";
  //     }
  //     if (!animal.friendlyTo.cats) {
  //       dislikeStr += (!dislikeStr ? "" : ", ") + "cats";
  //     }
  //     return `Dislike ${dislikeStr}`;
  //   }
  // };
  // // Adding pet friendliness
  //   const initializePetFriendliness = function (samePetArr) {
  //     const newArr = samePetArr.slice();
  //     newArr.forEach((pet) => {
  //       pet.friendliness = getFriendllinessStr(pet);
  //     });
  //     return newArr;
  //   };

  // If /browse, then just fetch all pets
  if (Object.keys(req.query).length == 0) {
    Pet.fetchAll((pets) => {
      const catBreeds = pets.cat.reduce((acc, cat) => {
        if (!acc.includes(cat.breed)) {
          acc.push(cat.breed);
        }
        return acc;
      }, []);
      const dogBreeds = pets.dog.reduce((acc, dog) => {
        if (!acc.includes(dog.breed)) {
          acc.push(dog.breed);
        }
        return acc;
      }, []);

      const { dog, cat } = pets;
      const allPets = [...dog, ...cat];
      res.render("./shop/browsePets", {
        username: req.session.username,
        data: allPets,
        params: {},
        dogBreeds: catBreeds,
        catBreeds: dogBreeds,
      });
    });
    return;
  }
  console.log("my query:", req.query);

  // Access query parameters using req.query
  const type = req.query.type; // "dog"
  const catBreed = req.query["cat-breed"]; // "all-cat"
  const dogBreed = req.query["dog-breed"]; // "all-dog"
  const minAge = req.query["min-age"]; // "1"
  const maxAge = req.query["max-age"]; // "2"
  const gender = req.query["gender"]; // "male"
  const friendlyTo = {
    dogs: req.query["friendly-dogs"],
    cats: req.query["friendly-cats"],
    children: req.query["friendly-children"],
  };

  //
  const paramList = {
    type: type,
    catBreed: catBreed,
    dogBreed: dogBreed,
    minAge: minAge,
    maxAge: maxAge,
    gender: gender,
    friendlyTo: friendlyTo,
  };

  Pet.fetchSome((filteredPets) => {
    Pet.fetchAll((pets) => {
      const catBreeds = pets.cat.reduce((acc, cat) => {
        if (!acc.includes(cat.breed)) {
          acc.push(cat.breed);
        }
        return acc;
      }, []);
      const dogBreeds = pets.dog.reduce((acc, dog) => {
        if (!acc.includes(dog.breed)) {
          acc.push(dog.breed);
        }
        return acc;
      }, []);
      const sortedCatBreeds = Array.from(catBreeds).sort();
      const sortedDogBreeds = Array.from(dogBreeds).sort();
      res.render("./shop/browsePets", {
        username: req.session.username,
        data: filteredPets,
        params: paramList,
        dogBreeds: sortedDogBreeds,
        catBreeds: sortedCatBreeds,
      });
    });
  }, paramList);

  // const updateParamObj = { id: idUtil.createUniqueID() };
  // Pet.updateAllPets(updateParamObj);

  // Filter and return a list of animal according to search parameter
  //   try {
  //     const jsonData = fs.readFileSync(
  //       path.join(rootDir, "data", "pets.json"),
  //       "utf8"
  //     );
  //     const parsedJSON = JSON.parse(jsonData);
  //     const filteredData = filterData(parsedJSON, paramList);

  //     res.render("browsePets", {
  //       username: req.session.username,
  //       data: filteredData,
  //     });
  //   } catch (err) {
  //     console.error("Cant retrieve pet data: " + err);
  //     res.status(400).json({ success: false, message: "FAILED pet retrieval" });
  //     // res.render("browsePets", { username: req.session.username });
  //   }
};

exports.getPetDetail = (req, res) => {
  const { type, nameAndId } = req.params;
  const [name, id] = nameAndId.split("-");
  console.log(type, name, id);

  // // params.type
  Pet.fetchById(
    (pet) => {
      res.render(`./shop/petInfo`, {
        username: req.session.username,
        pet: pet,
      });
    },
    type,
    id
  );
};

exports.getAllPages = (req, res, next) => {
  const pageList = [
    "catCare",
    "dogCare",
    "contact",
    "givePet",
    "sign-in",
    "sign-up",
    // "petInfo",
  ];
  const page = req.params.page;
  // if (page ==="petInfo"){
  //   res.render("./shop/" + page, { username: req.session.username,  });
  // }
  if (pageList.includes(page)) {
    res.render("./shop/" + page, { username: req.session.username });
  } else {
    next();
  }
};
