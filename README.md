#  🐶😺 About PawsVille
## 🎯 Purpose 
Check out [Pawsville](https://pawsville.onrender.com/)!🐕🐈  

PawsVille is a fictional Pet Adoption website specific for cats and dogs! The center contains the following services:
  1. Pets Available for Adoption
  2. Giving Pets Away
  3. Login System 
  4. Cat and Dog Care Resources
     
## 🧑‍💻 Development Process 
### 1. Tools
  - **Design:** originally designed and assembled in Figma  
  - **Development:** Built Express.JS, Node.JS, Javascript and styled with TailwindCSS    
  - **Images & Icons:** To be updated

### 2. Obstacles   
  1. Separation of File Logic   
  - **Challenge:**  
    As the project's complexity evolves, the server.js file become pacted and the pet object (which represents any singular pet) containing more attributes, the backend JS files demanded to be split into logical units.   
  - **Solution:**  
     Adopting the Model-view-controller software architectural pattern  
      - Model: The central product of PawsVille , the pets, are stored in a Pet class in `model/pet.js`. All relevant functions that manipulate this model data (such as get pets, filter pets, ...) are also stored under the Model.  
      - View: A list of EJS files, visual representations that render data dynamically. I chose EJS for its ability to dynamic rendering as well as avoiding code reuse via HTML templates.  
      - Controller: Liaison between the model (pet data) to the view (ejs files), the controllers interact with the model according to the route that it was called.

  2. Render data dynamically
  - **Challenge:**
    As more parameters and filters are required for a pet, rendering pets using front-end javascript files make it difficult to follow all elements in a given html file.
  - **Solution:**  
    The ideal solution would be to adopt the React libary or Angular framework, however I wanted to practice vanilla Javascript to strengthen my foundations. Thus I opted for EJS, a small and handy JS templating library that allow dynamic rendering when you include the data in Node's response.

   3. User Authentication and Data Storage
   - **Challenge**:
   To authenticate users, we must hash and store user's passwords safely.
   - **Solution**:  
   The current version uses NodeJS to store directly the usernames and passwords into JSON file. Obviously this is a massive security risk, and so my next step in this project is to integrate password hashing via argon2, as well as storing data using MongoDB.

   
## ⬇️ Installation Instructions    

Upon downloaded, please use following command to start
`npm run start:dev`

## 🗃️ File structure 

Ex 1,2,3 source codes can be found in folder q1, q2 and q3.  
Ex 4 source code is in the current folder (A3).

**controllers**
- The following files control how the backend requests handle different routes
- `pets.js` - contains functions for pets routes
- `shop.js` - contains  functions handling shops routes
- `users.js` - contains functions that handling users routes

**data**
- `accounts.json` - contains usernames and passwords
- `pets.json` - contains pet information from give pet page

**models**
- `pet.js` - contains the `Pet` class, as well as all functions that interact with the `pets.json` data

**public**

- css
  - `output.css` from tailwind output css export
  - `styles.css` tailwind input css file
- imgs
  - contains all relevant source images as well as a `credit.txt` file
- js
  - contains all relevant front end js file, such as
  - `app.js`
  - `account.js` for all front end user account logic
  - `findPet.js` for all front end logic for findPet.ejs
  - `givePet.js` for all front end logic for givePet.ejs

**views**

- all `ejs files` and templates that represent the website visually

