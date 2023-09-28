const {User} = require('../mongo/usersSchema'); 

async function getUserByEmailModel(email) {
    return await User.findOne({ email });
}

async function addUserModel(userDetails) {
    return await User.create(userDetails);   
}

const getUserDetailsModel = async (userID) => {
    try {
        const userDetails = await User.findOne(
            { _id: userID },
            'email first_name last_name phone_number short_bio role' // Fields to return
        );

        return userDetails;
    } catch (error) {
        console.log('Error in getUserDetailsModel:', error);
        return null;
    }
};

module.exports = { getUserByEmailModel, addUserModel, getUserDetailsModel };

// async function updateUserByEmailModel(email, updatedDetails) {
//     return await User.findOneAndUpdate({ email }, updatedDetails, { new: true });
// }
