const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../mongo/usersSchema"); 
const { getUserByEmailModel, addUserModel, getUserDetailsModel } = require('../models/usersModel'); 
const secretKey = process.env.SECRET_KEY;

async function loginUser(req, res) {
    try {
        const user = await getUserByEmailModel(req.body.email);

        if (!user) {
            res.status(401).send('Invalid email or password');
            return;
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            res.status(401).send('Invalid email or password');
            return;
        }

        const token = jwt.sign(
            { userID: user._id, email: user.email },
            secretKey,
            { expiresIn: '30d' }
        );

        res.cookie('token', token, { httpOnly: true })
            .status(200)
            .send('Login successful');
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}
const saltRounds = 10;

async function addUser(req, res) {
    try {
        const { email, password, username, allergens } = req.body;

        if (!email || !password || !username || !allergens) {
            res.status(400).send('Email, username and password are required');
            return;
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUserDetails = {
            email,
            password: hashedPassword,
            username,
            allergens,
            role: 'user',
        };

        await addUserModel(newUserDetails);

        res.status(201).send('Added user, backend');
    } catch (err) {
        console.error("Error Details:", err);
        res.status(500).send('Failed to add user, backend');
    }
}

const getUserDetails = async (req, res) => {
    try {
        const userID = req.user.userID;

        const userDetails = await getUserDetailsModel(userID);

        if (userDetails) {
            res.status(200).json(userDetails);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.log('Error in getUserDetails:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = { addUser, loginUser, getUserDetails };


// async function updateUserProfile(req, res) {
//     try {
//         const userEmail = req.user.email;
//         const { first_name, last_name, phone_number, short_bio } = req.body;

//         const updatedUserDetails = {
//             first_name,
//             last_name,
//             phone_number,
//             short_bio
//         };

//         const updatedUser = await updateUserByEmailModel(userEmail, updatedUserDetails);

//         if (updatedUser) {
//             res.status(200).send('User profile updated');
//         } else {
//             res.status(404).send('User not found');
//         }
//     } catch (err) {
//         res.status(500).send('Failed to update user profile');
//     }
// }