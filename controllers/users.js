// const session = require("express-session");
const fs = require("fs");
const path = require("path");
const rootDir = require("../util/path");
exports.postLogout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Failed to log out" });
    } else {
      res.status(200).json({ success: true, message: "Logout successful" });
    }
  });
};

// Route validate creation of new user account
// If validated, appends the user account and password to json file
// If username already exists, return a
exports.postCreatingAccount = (req, res) => {
  const { username, password } = req.body;
  let newMapArray;
  try {
    const jsonData = fs.readFileSync(
      path.join(rootDir, "data", "accounts.json"),
      "utf8"
    );
    const parsedArr = JSON.parse(jsonData);
    const parsedMap = new Map(parsedArr);

    // if username already exists,
    if (parsedMap.has(username)) {
      console.log("username is taken. nothhing happened");
      res.status(409).json({
        error: "Username is taken. Please choose another username.",
      });
      return;
    } else {
      parsedMap.set(username, password);
      newMapArray = Array.from(parsedMap);
    }
  } catch (err) {
    // if no account exists, we make a new json file
    console.error("error>", err);
    const newMap = new Map();
    newMap.set(username, password);
    newMapArray = Array.from(newMap);
  }
  const jsonData = JSON.stringify(newMapArray, null, 2); // `null, 2` for pretty-printing the JSON
  // Write the JSON string to a file (synchronously)
  fs.writeFileSync(
    path.join(rootDir, "data", "accounts.json"),
    jsonData,
    "utf8"
  );
  res
    .status(200)
    .json({ success: true, message: "Account creation successful" });
};

// Route validate signing in
exports.postSigningIn = (req, res) => {
  const { username, password } = req.body;
  try {
    const jsonData = fs.readFileSync(
      path.join(rootDir, "data", "accounts.json"),
      "utf8"
    );
    const parsedArr = JSON.parse(jsonData);
    const parsedMap = new Map(parsedArr);

    if (!parsedMap.has(username)) {
      res.status(401).json({ message: "Invalid username or password" });
      return;
    }

    // Check if the password matches
    if (parsedMap.get(username) === password) {
      req.session.username = username; // Set the session username
      res.status(200).json({
        success: true,
        message: "Login successful",
      });
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (err) {
    console.error("Error fetching user accounts:", err);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
