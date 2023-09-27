
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { addProviderModel, addDishModel, editDishModel, currentlyOnMenuModel, currentlyOffMenuModel } = require('../models/providersModel');

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
        const dishDetails = req.body;
        const newDish = await addDishModel(dishDetails);
        res.status(201).send('Added dish, backend');
    } catch (err) {
        console.error("Error Details:", err);
        res.status(500).send('Failed to add dish, backend');
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

module.exports = { addProvider, addDish, editDish, currentlyOnMenu, currentlyOffMenu };
