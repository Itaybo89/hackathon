const { Provider } = require('../mongo/providersSchema');

async function deleteDishModel(providerId, dishId) {
    return await Provider.findByIdAndUpdate(
        providerId,
        { $pull: { dishes: { _id: dishId } } },
        { new: true }
    );
}


async function addProviderModel(providerDetails) {
    return await Provider.create(providerDetails);
}

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
    currentlyOffMenuModel,
    deleteDishModel,
};
