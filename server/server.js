const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const OpenAI = require("openai");
const connectDB = require('./mongo/db');
const allergyList = require('./allergens');


require("dotenv").config();

const server = express();
const port = process.env.PORT || 8080;
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const providersRoutes = require("./routes/providersRoutes");
const usersRoutes = require("./routes/usersRoutes");

server.use(cors({ origin: "http://localhost:3000", credentials: true }));
server.use(express.json());
server.use(cookieParser());

server.use("/providers", providersRoutes);
server.use("/users", usersRoutes);

async function getAllergiesFromIngredients(ingredientsString) {
  const prompt = `New Request: Ignore all previous history. Examine the given list of allergens and identify the corresponding IDs that match with the 'ingredientsString'. Note: Your output should exclusively be an array containing the IDs of the matching allergens from the 'allergenList'. An empty array should be returned if there are no matches. Any other response format is unacceptable. Allergen List: ${allergyList}, Ingredients: ${ingredientsString}.`;
  const chatCompletion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: prompt,
      },
      {
        role: 'user',
        content: 'Find matching allergies.',
      },
    ],
    max_tokens: 100,
  });

  const processedResponseArray = chatCompletion.choices[0].message.content.trim();
  return processedResponseArray;
}



async function init() {
    await connectDB(); 
    server.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  }
  
  init();

  module.exports = (getAllergiesFromIngredients) ;
