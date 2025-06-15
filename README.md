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
    - Challenge: As the project's complexity evolves, the server.js file become pacted and the pet object (which represents any singular pet) containing more attributes, the backend JS files demanded to be split into logical units.
    - Solution: Adopting the Model-view-controller software architectural pattern
        - Model: The central product of PawsVille , the pets, are stored in a Pet class in the JS file. All relevant functions that manipulate this model (such as get pets, filter pets, ...) are also stored under the Model.
        - View: A list of EJS files, visual representations that render the appropriate page dynamically. EJS was chosen for its ability to generate dynamic data as well as reusing code via HTML templates.
        - Controller: 

## ⬇️ Installation Instructions 

Please use command  
`npm run start`

## 🗃️ File structure 

Ex 1,2,3 source codes can be found in folder q1, q2 and q3.  
Ex 4 source code is in the current folder (A3).

**data**

- `accounts.json` - json containing user name and password
- `pets.json` - json containing pet information from give pet page

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

- all `ejs files` and templates

