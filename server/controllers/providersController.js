
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { deleteDishModel, addProviderModel, addDishModel, editDishModel, currentlyOnMenuModel, currentlyOffMenuModel } = require('../models/providersModel');
// const {getAllergiesFromIngredients}  = require('../server.js');
require("dotenv").config();
const OpenAI = require("openai");
const allergyList = require('../allergens');



const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

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


async function deleteDish(req, res) {
    try {
        const { providerId, dishId } = req.body;
        const result = await deleteDishModel(providerId, dishId);
        if (result) {
            res.status(200).send('Successfully deleted dish.');
        } else {
            res.status(404).send('Dish not found.');
        }
    } catch (err) {
        console.error("Error Details:", err);
        res.status(500).send('Failed to delete dish.');
    }
}

async function addProvider(req, res) {
    try {
        const { email, password, username } = req.body;

        if (!email || !password || !username) {
            res.status(400).send('Email, username and password are required');
            return;
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newProviderDetails = {
            email,
            password: hashedPassword,
            username,
            role: 'provider',
        };

        await addProviderModel(newProviderDetails);

        res.status(201).send('Added provider, backend');
    } catch (err) {
        console.error("Error Details:", err);
        res.status(500).send('Failed to add provider, backend');
    }
}

async function addDish(req, res) {
    try {
        const providerId = req.body.providerId;
        const newDish = req.body.dishes;
        console.log(newDish.ingredients.join(", "));
        const allergies = await getAllergiesFromIngredients(newDish.ingredients.join(", "));
        console.log(allergies);

        await addDishModel(providerId, newDish);

        res.status(200).send('Added dish and updated allergies');
    } catch (err) {
        console.error("Error Details:", err);
        res.status(500).send('Failed to add dish and update allergies');
    }
}


async function editDish(req, res) {
    try {
        const { id } = req.params;
        const updatedDishDetails = req.body;

        const result = await editDishModel(id, updatedDishDetails);

        if (result) {
            res.status(200).send('Updated dish, backend');
        } else {
            res.status(404).send('Dish not found');
        }
    } catch (err) {
        console.error("Error Details:", err);
        res.status(500).send('Failed to update dish, backend');
    }
}

async function currentlyOnMenu(req, res) {
    try {
        const dishId = req.body.dishId;
        const providerId = req.user.userID;
        const result = await currentlyOnMenuModel(providerId, dishId);

        if (result) {
            res.status(200).send({ message: 'Dish is currently on menu' });
        } else {
            res.status(400).send({ message: 'Could not set dish to be currently on menu' });
        }
    } catch (err) {
        console.error("Error Details:", err);
        res.status(500).send('Error setting dish to be currently on menu');
    }
}

async function currentlyOffMenu(req, res) {
    try {
        const dishId = req.body.dishId;
        const providerId = req.user.userID;
        const result = await currentlyOffMenuModel(providerId, dishId);

        if (result) {
            res.status(200).send({ message: 'Dish is currently off menu' });
        } else {
            res.status(400).send({ message: 'Could not set dish to be currently off menu' });
        }
    } catch (err) {
        console.error("Error Details:", err);
        res.status(500).send('Error setting dish to be currently off menu');
    }
}




module.exports = { deleteDish, addProvider, addDish, editDish, currentlyOnMenu, currentlyOffMenu };
