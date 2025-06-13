## Instructions

To run q1 from the A3 directory, please use command  
`npx nodemon q1/ex1`

To run q2 from the A3 directory, please use command  
`npx nodemon q2/numOfVisits`

To run q3 from A3 directory, please use command  
`npx nodemon q3/ex3`

To run the pet project (Q4) from A3 directory, please use command  
`npm run dev`

## File structure

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

## Q4 Change Log

- **Additional Feature**

  - Dynamic Pet Rendering
    - All new pet submitted on givePet page will immediately be featured on the findPet page. Their breed will also appear on the form for browsing.

- **Minor change**

  - JSON files are used instead of txt file as I wish to incorporate API with this project in the future
  - sign-in page will not load the givePet page, but redirect you to the homepage instead. However, givePet page is still only accessable once user is logged in.
