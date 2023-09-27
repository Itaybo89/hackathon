const {User} = require('../mongo/usersSchema'); 

async function getUserByEmailModel(email) {
    return await User.findOne({ email });
}

async function addUserModel(userDetails) {
    return await User.create(userDetails);
    
}

async function updateUserByEmailModel(email, updatedDetails) {
    return await User.findOneAndUpdate({ email }, updatedDetails, { new: true });
}

module.exports = { getUserByEmailModel, addUserModel, updateUserByEmailModel };
