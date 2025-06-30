"use strict";

// Get pet data
async function fetchPetData() {
  const response = await fetch("/pets", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const data = await response.json();
    if (data.success) {
      console.log(data.petData);
      return data.petData;
    } else {
      console.error("Error:", data.message);
    }
  } else {
    console.error("HTTP error:", response.statusText);
  }
}

// return all breed names in a set
export function allBreedNames(arr) {
  let breedSet = new Set();
  for (animal in arr) {
    namesSet.add(animal.breed);
  }
  return breedSet;
}
// FIND PET FUNCTIONS

function ageRangeVerified() {
  const minAge = Number(document.querySelector("#min-age").value);
  const maxAge = Number(document.querySelector("#max-age").value);
  return minAge <= maxAge || minAge == "" || maxAge == "" ? true : false;
}

function listenCatRadio() {
  const formPetCatRadio = document.querySelector("#cat-radio");
  formPetCatRadio.addEventListener("change", function (event) {
    const dogBreedSelectWrapper = document.getElementById(
      "dog-breed-select-wrapper"
    );
    const catBreedSelectWrapper = document.getElementById(
      "cat-breed-select-wrapper"
    );
    dogBreedSelectWrapper.style.display = "none";
    catBreedSelectWrapper.style.display = "block";
    // dogBreedSelect.style.opacity = "0.5";
    // dogBreedSelect.style.pointerEvents = "none";
    // if (catBreedSelect.style.opacity === "0.5") {
    // catBreedSelect.style.opacity = "1";
    // catBreedSelect.style.pointerEvents = "auto";
    // }
  });
}
function listenDogRadio() {
  const formPetDogRadio = document.getElementById("dog-radio");
  formPetDogRadio.addEventListener("change", function (event) {
    const dogBreedSelectWrapper = document.getElementById(
      "dog-breed-select-wrapper"
    );
    const catBreedSelectWrapper = document.getElementById(
      "cat-breed-select-wrapper"
    );
    catBreedSelectWrapper.style.display = "none";
    // catBreedSelect.style.opacity = "0.5";
    // catBreedSelect.style.pointerEvents = "none";
    dogBreedSelectWrapper.style.display = "block";
    // if (dogBreedSelect.style.opacity === "0.5") {

    // dogBreedSelect.style.opacity = "1";
    // dogBreedSelect.style.pointerEvents = "auto";
    // }
  });
}
function listenSubmitForm(pets) {
  const findPetForm = document.getElementById("find-pet-form");
  findPetForm.addEventListener("submit", async function (e) {
    // e.preventDefault();
    if (!ageRangeVerified()) {
      alert("Max age must be above min age input");
      e.preventDefault();
    } else {
      // const formData = new FormData(this);
      // const params = new URLSearchParams(formData).toString();
      // console.log(params);
      // // updates the URL but doesn't reload the page
      // // window.history.pushState({}, "", `/browse?${params}`);
      // const response = await fetch(`/browse${params}`, {
      //   method: "GET",
      // });
      // if (response.ok) {
      //   const data = await response.json();
      //   if (data.success) {
      //     initializePetData(data.petData);
      //     // renderPetsForms(data.petData);
      //   } else {
      //     console.log("data not found...");
      //   }
      // } else {
      //   console.error("Error fetching pet data:", response.statusText);
      // }
    }
  });
}

// function renderPetsForms(pets) {
//   const browseContainer = document.querySelector(".browse-pets-container");
//   browseContainer.innerHTML = "";
//   // make new array for each pet

//   const allPets = Object.values(pets).flat();
//   // m
//   for (let animal of allPets) {
//     const petDiv = document.createElement("div");
//     petDiv.innerHTML = `<figure
//                   class="rounded-t-lg overflow-hidden flex items-center aspect-[1/1]"
//                 >
//                   <img
//                     class="rounded-t-lg"
//                     src="${animal.img_url}"
//                     alt="product image"
//                   />
//                 </figure>
//                 <div class="px-5 pb-5 py-2 text-center">
//                   <h5
//                     class="text-3xl font-semibold tracking-tight text-slate-700 righteous-regular"
//                   >
//                     ${animal.name}
//                   </h5>
//                   <ul
//                     class="[&>*]:inline-block [&>*]:pl-3 [&>*]:before:content [&>*]:before:right-2 [&>*]:before:relative [&>*]:before:content-['•'] [&>*]:before:text-orange-400"
//                   >
//                     <li class="text-slate-700 nunito-sans-regular"> ${animal.type}</li>

//                     <li class="text-slate-700 nunito-sans-regular">
//                        ${animal.breed}
//                     </li>

//                     <li class="text-slate-700 nunito-sans-regular"> ${animal.gender}</li>

//                     <li class="text-slate-700 nunito-sans-regular"> ${animal.age} yrs old</li>

//                     <li class="text-slate-700 nunito-sans-regular"> ${animal.friendliness}</li>
//                   </ul>
//                   <div class="flex items-center justify-center">
//                     <button
//                       class="text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg px-3 py-2 text-center text-lg mt-2"
//                     >
//                       Interested
//                     </button>
//                   </div>
//                 </div>`;
//     petDiv.classList.add(
//       "bg-amber-50",
//       "rounded-lg",
//       "border-1",
//       "shadow-sm",
//       "border-orange-200"
//     );
//     browseContainer.appendChild(petDiv);
//   }
// }

function updateAnimalFormOptions(animalType, animalArr) {
  // if (animalType == "dog") {
  //   animalArr = pets.dog;
  // } else if (animalType == "cat") {
  //   animalArr = pets.cat;
  // }
  const animalSelectForm = document.querySelector(
    `#${animalType}-breed-select`
  );
  const breedsSet = new Set();
  const breedsArr = [];

  for (const animal of animalArr) {
    if (!breedsSet.has(animal.breed)) {
      breedsArr.push(animal.breed);
      breedsSet.add(animal.breed);
    }
  }
  const sortedBreedsArr = Array.from(breedsArr).sort();

  const optionAll = document.createElement("option");
  optionAll.value = `all-${animalType}`;
  optionAll.textContent = "All";
  animalSelectForm.appendChild(optionAll);
  for (const breed of sortedBreedsArr) {
    const option = document.createElement("option");
    option.value = breed;
    option.textContent = breed;
    animalSelectForm.appendChild(option);
  }
}
function initializePetData(pets) {
  for (const animalType in pets) {
    if (pets.hasOwnProperty(animalType)) {
      const animalArr = pets[animalType];

      // initializePetFriendliness(animalArr);
      updateAnimalFormOptions(animalType, animalArr);
    }
  }
}
//
export async function initializeFindPetPage() {
  let pets = await fetchPetData();

  // initializePetData(pets);

  listenCatRadio();
  listenDogRadio();
  listenSubmitForm(pets);

  // renderPetsForms(pets);
}
