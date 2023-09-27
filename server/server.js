const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const OpenAI = require("openai");
const connectDB = require('./mongo/db'); 

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

server.post("/adddish", async (req, res) => {
  const searchString = req.body.searchString;
  try {
    const pets = await dbConnection("pets").select("*");
    const prompt = `Disregard every message that came before this one; this is a new request and should not use any prior history. Find pets which match the following search line within the provided database. Return only an array of pet IDs that match the search criteria. No other types of responses are acceptable., Search string: ${searchString}, Data Base: ${JSON.stringify(
      pets
    )}`;

    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: prompt,
        },
        {
          role: "user",
          content: "Find matching pets.",
        },
      ],
      max_tokens: 100,
    });

    const processedResponse = chatCompletion.choices[0].message.content.trim();
    const processedResponseArray = JSON.parse(processedResponse);
    const filteredPets = pets.filter((pet) =>
      processedResponseArray.includes(pet.petID)
    );
    res.json({ filteredPets: filteredPets });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

server.use("/providers", providersRoutes);
server.use("/users", usersRoutes);


async function init() {
    await connectDB(); 
    server.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  }
  
  init();