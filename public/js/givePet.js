"use strict";
// import { ageRangeVerified } from "./findPet.js";

export function intializeGivePetPage() {
  listenSubmitForm();
}

function ageRangeVerified() {
  const minAge = Number(document.querySelector("#min-age").value);
  const maxAge = Number(document.querySelector("#max-age").value);
  return minAge <= maxAge ? true : false;
}

function listenSubmitForm() {
  const form = document.querySelector("#give-pet-form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!ageRangeVerified()) {
      alert("Max age must be above min age input.");
      return;
    }
    const formData = new FormData(form);
    const formObject = Object.fromEntries(formData.entries());

    const response = await fetch("/givePet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formObject),
    });
    if (response.ok) {
      const data = await response.json();
      if (data.success) {
        alert("Data sent! Check out your pet in the browse pets page!");
      } else {
        alert("An error occured");
      }
    }
  });
}
