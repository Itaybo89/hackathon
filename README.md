# ScanEat

## Project Overview
ScanEat is an innovative platform designed for restaurants to manage their menus with a focus on allergen awareness. Developed over a two-day hackathon by a team of three, this project leverages React for the frontend, Node.js for the backend, and MongoDB for database management. ScanEat enables restaurants to create accounts, add dishes with ingredients (excluding recipes), and automatically generates barcodes for each dish. When scanned, these barcodes reveal potential allergens to customers, thanks to AI-powered analysis, enhancing dining safety for individuals with allergies.

## Live Demo
[Click here to visit ScanEat](http://scaneat.herokuapp.com/)

## Screenshots
Below are screenshots demonstrating the core functionalities of ScanEat:

- **Restaurant Dashboard**
![Restaurant Dashboard](./images/pictures/image1.jpg)

- **Personalized Page**
![Personalized Page](./images/pictures/image2.jpg)

These images showcase the user interface for restaurant management and the personalized page for customers, highlighting ScanEat's focus on user experience and safety.

## Table of Contents
- [About The Project](#about-the-project)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Setup / Installation](#setup--installation)
- [Database Schema Examples](#database-schema-examples)
- [Contributors](#contributors)
- [Acknowledgments](#acknowledgments)
- [License](#license)

## About The Project
ScanEat aims to address the challenge of allergen communication in restaurants by providing an easy-to-use platform for managing dish ingredients and allergen information. By simplifying the process of identifying allergens, ScanEat aids in preventing allergic reactions and ensuring a safer dining experience for customers with food allergies.

## Technologies Used
- **Frontend:** React.js
- **Backend:** Node.js
- **Database:** MongoDB
- **AI Integration:** Custom AI for allergen detection
- **Other Technologies:** Barcode generation and scanning technology

## Features
- **Restaurant Account Creation:** Restaurants can sign up and manage their profile.
- **Dish Management:** Ability to add dishes with ingredients and allergen information.
- **Barcode Generation:** Each dish comes with a unique barcode that, when scanned, displays its allergen contents.
- **AI-Powered Allergen Detection:** Analyzes dish ingredients against a database of allergens to identify potential risks.

## Setup / Installation
This project requires Node.js and npm installed on your machine. Clone the repository, install dependencies for both the client and server, and start the respective development servers.
1. Clone the repository to your local machine:
   ```
   git clone https://github.com/Itaybo89/hackathon.git
   ```
2. Navigate to the project directory:
   ```
   cd hackathon
   ```
3. Install dependencies for the server:
   ```
   cd server
   npm install
   ```
4. Start the server:
   ```
   npm run start
   ```
   The server will be running on [http://localhost:8080](http://localhost:8080). Make sure to enable CORS for [http://localhost:3000](http://localhost:3000).
5. Open a new terminal window/tab, navigate back to the project directory, and install dependencies for the client:
   ```
   cd ..
   cd client
   npm install
   ```
6. Start the client:
   ```
   npm start
   ```
   The client should now be running on [http://localhost:3000](http://localhost:3000).

## Database Schema Examples
```javascript
const dishSchema = new Schema({
  dishName: { type: String, required: true },
  ingredients: [{ type: String, required: true }],
  allergies: { type: Array },
  onMenu: { type: Boolean, default: true },  
  mayContain: [{ type: String }],
  freeText: { type: String },  
});

const providerSchema = new Schema({
  restaurantId: { type: Number, unique: true }, 
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, default: "provider" },
  dishes: [dishSchema],
  date: { type: Date, default: Date.now },
});
```

## Contributors
- Team Members: Itay Boutboul, Dror Liba, Lukas Lehrmann
- Special thanks to our instructors at ITC for their guidance and support throughout the project.

## Acknowledgments
This project was a collaborative effort made possible by the hard work and dedication of our team members and the support of our instructors at ITC.
