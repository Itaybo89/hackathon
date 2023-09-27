const { Provider } = require('../mongo/providersSchema');

// Add a new provider to the MongoDB collection
async function addProviderModel(providerDetails) {
    return await Provider.create(providerDetails);
}

// Add a new dish to a provider's document in the MongoDB collection
async function addDishModel(providerId, newDish) {
    return await Provider.findByIdAndUpdate(
        providerId,
        { $push: { dishes: newDish } },
        { new: true }
    );
}

async function deleteDishModel(providerId, dishId) {
    return await Provider.findByIdAndUpdate(
        providerId,
        { $pull: { dishes: { _id: dishId } } },
        { new: true }
    );
}

async function currentlyOnMenuModel(providerId, dishId) {
    return await Provider.findOneAndUpdate(
        { "_id": providerId, "dishes._id": dishId },
        { $set: { "dishes.$.onMenu": true } },
        { new: true }
    );
}
async function currentlyOffMenuModel(providerId, dishId) {
    return await Provider.findOneAndUpdate(
        { "_id": providerId, "dishes._id": dishId },
        { $set: { "dishes.$.onMenu": false } },
        { new: true }
    );
}

async function editDishModel(providerId, dishId, updatedDishDetails) {
    const provider = await Provider.findById(providerId);
    const dish = provider.dishes.id(dishId);
    
    Object.assign(dish, updatedDishDetails);
    
    return await provider.save();
}

module.exports = {
    addProviderModel,
    addDishModel,
    deleteDishModel,
    editDishModel,
    currentlyOnMenuModel,
    currentlyOffMenuModel
};
