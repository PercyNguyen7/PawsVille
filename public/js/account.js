export function updateUI() {
  const userProfileBtn = document.querySelector("#user-profile-header-btn");

  if (userProfileBtn.innerHTML !== "") {
    const logoutBtn = document.createElement("button");
    logoutBtn.innerHTML = "Log Out";
    logoutBtn.className +=
      "py-1 px-3 text-orange-100 nunito-sans-regular hover:text-white hover:border-white cursor-pointer";
    logoutBtn.id = "header-logout-btn";
    const signInBtn = document.querySelector("#header-sign-in-btn");
    const signUpBtn = document.querySelector("#header-sign-up-btn");
    signInBtn.classList.add("hidden");
    signUpBtn.classList.add("hidden");
    const headerAccountProfile = document.querySelector(
      "#header-account-profile"
    );
    userProfileBtn.classList.remove("hidden");
    userProfileBtn.className +=
      "border-2 rounded-md border-orange-100 py-1 px-3 text-orange-100 nunito-sans-regular hover:text-white hover:border-white cursor-pointer";

    headerAccountProfile.appendChild(userProfileBtn);
    headerAccountProfile.appendChild(logoutBtn);
  } else {
    userProfileBtn.classList.add("hidden");
    const logoutBtn = document.querySelector("header-logout-btn");
    if (logoutBtn) logoutBtn.remove();
    return;
  }
}

export function listenLogout() {
  const logoutBtn = document.querySelector("#header-logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      try {
        const response = await fetch("/accounts/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Make sure this is set
          },
        });

        if (response.ok) {
          const data = await response.json();
          // If successful, redirect to the homepage
          if (data.success) {
            window.location.href = "/sign-in";
            // alert("Logout successful");
            // Redirect the user to the homepage (or another page)
            // or '/dashboard', '/profile', etc.
          } else {
            alert("Logout failed: " + data.message);
          }
        }
      } catch (err) {
        console.error("error is" + err);
      }
    });
  }
}

function listenSignUp() {
  const form = document.querySelector("#sign-up-form");

  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    const formData = new FormData(form); // Collect form data
    const formObject = Object.fromEntries(formData.entries());

    try {
      // Send form data via POST request to the backend
      const response = await fetch("/accounts/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Make sure this is set
        },
        body: JSON.stringify(formObject),
      });

      // Check if the login was successful
      if (response.ok) {
        const data = await response.json();
        // user = data.username;

        // If successful, redirect to the homepage
        if (data.success) {
          alert("Sign up successful");
          // Redirect the user to the homepage (or another page)
          window.location.href = "/sign-in"; // or '/dashboard', '/profile', etc.
        } else {
          alert("Sign up failed: " + data.error);
        }
      } else if (response.status === 409) {
        alert("Username already taken, please use another!");
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Error during login:", error);
      alert(error);
    }
  });
}

function listenSignIn() {
  const form = document.querySelector("#sign-in-form");
  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    const formData = new FormData(form); // Collect form data
    const formObject = Object.fromEntries(formData.entries());
    try {
      // Send form data via POST request to the backend
      const response = await fetch("/accounts/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Make sure this is set
        },
        body: JSON.stringify(formObject),
      });
      // Check if the login was successful
      if (response.ok) {
        const data = await response.json();
        // If successful, redirect to the homepage
        if (data.success) {
          // user = formObject;

          alert(`Welcome back ${formObject.username}`);

          // Redirect the user to the homepage (or another page)
          updateUI();
          window.location.href = "/home"; // or '/dashboard', '/profile', etc.
        } else {
          // Display error message if login failed
          alert("Login failed: " + data.message);
        }
      } else {
        // If response is not okay (e.g., 400 or 500 error), handle the error
        alert("User account and password combination not found");
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Error during login:", error);
      alert("Something went wrong. Please try again later.");
    }
  });
}

export function initializeSignUp() {
  listenSignUp();
}

export function initializeSignIn() {
  listenSignIn();
}
