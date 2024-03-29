
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { addProviderModel, addDishModel, currentlyOnMenuModel, currentlyOffMenuModel, getAllDishesModel } = require('../models/providersModel');
require("dotenv").config();
const OpenAI = require("openai");
const allergyList = require('../allergens');
const {User} = require('../mongo/usersSchema');
const {Provider} = require('../mongo/providersSchema');
const allergyListNice = [
  "Celery",
  "Gluten",
  "Crustaceans",
  "Eggs",
  "Fish",
  "Lupin",
  "Milk",
  "Molluscs",
  "Mustard",
  "Nuts",
  "Peanuts",
  "Sesame seeds",
  "Sulphur dioxide",
  "Soya"
];

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
  
      const existingProvidersCount = await Provider.countDocuments({});
      newProviderDetails.restaurantId = existingProvidersCount + 1;
  
      await addProviderModel(newProviderDetails);
  
      res.status(201).send('Added provider, backend');
    } catch (err) {
      console.error("Error Details:", err);
      res.status(500).send('Failed to add provider, backend');
    }
  }
 


async function addDish(req, res) {
    try {
        const providerId = req.body._id;
        const newDish = req.body.dishes;
        console.log(req.body);

        const allergies = await getAllergiesFromIngredients(req.body.dishes.ingredients.join(", "));
        newDish.allergies = allergies; 

        await addDishModel(providerId, newDish);

        res.status(200).send('Added dish and updated allergies');
    } catch (err) {
        console.error("Error Details:", err);
        res.status(500).send('Failed to add dish and update allergies');
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

async function getAllDishes(req, res) {
  try {
    const restaurantId = req.params.restaurantId;
    const userId = req.user.userID;

    const user = await User.findOne({ _id: userId });
    if (!user || !user.allergens) {
      res.status(400).send('User not found or no allergens specified');
      return;
    }

    const dishes = await getAllDishesModel(Number(restaurantId));
    if (!dishes) {
      res.status(404).send('Restaurant not found or no dishes available');
      return;
    }

    let allOverlappingDishesAndAllergens = [];

    for (const dish of dishes) {
      const parsedAllergies = JSON.parse(dish.allergies);
      const overlap = parsedAllergies
        .filter(allergy => user.allergens.includes(allergy))
        .map(id => allergyListNice[id]);

      if (overlap.length > 0) {
        allOverlappingDishesAndAllergens.push([dish.dishName, overlap]);
      }
    }

    res.status(200).json({
      allOverlappingDishesAndAllergens,
      userName: user.name,
    });
  } catch (err) {
    console.error("Error Details:", err);
    res.status(500).send('Failed to get dishes');
  }
}


module.exports = {  addProvider, addDish, currentlyOnMenu, currentlyOffMenu, getAllDishes };

// async function editDish(req, res) {
//     try {
//         const { id } = req.params;
//         const updatedDishDetails = req.body;

//         const result = await editDishModel(id, updatedDishDetails);

//         if (result) {
//             res.status(200).send('Updated dish, backend');
//         } else {
//             res.status(404).send('Dish not found');
//         }
//     } catch (err) {
//         console.error("Error Details:", err);
//         res.status(500).send('Failed to update dish, backend');
//     }
// }


// async function deleteDish(req, res) {
//     try {
//         const { providerId, dishId } = req.body;
//         const result = await deleteDishModel(providerId, dishId);
//         if (result) {
//             res.status(200).send('Successfully deleted dish.');
//         } else {
//             res.status(404).send('Dish not found.');
//         }
//     } catch (err) {
//         console.error("Error Details:", err);
//         res.status(500).send('Failed to delete dish.');
//     }
// }