const { Provider } = require('../mongo/providersSchema');


async function addProviderModel(providerDetails) {
    return await Provider.create(providerDetails);
  }

async function addDishModel(providerId, newDish) {
  console.log(newDish);
    return await Provider.findByIdAndUpdate(
        providerId,
        { $push: { dishes: newDish } },
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

async function getAllDishesModel(restaurantId) {
    try {
      const provider = await Provider.findOne({ restaurantId });
      if (!provider) {
        return null;
      }
      return provider.dishes;
    } catch (error) {
      console.error("Error Details:", error);
      return null;
    }
  }

module.exports = {
    addProviderModel,
    addDishModel,
    currentlyOnMenuModel,
    currentlyOffMenuModel,
    getAllDishesModel,
};


// async function deleteDishModel(providerId, dishId) {
//     return await Provider.findByIdAndUpdate(
//         providerId,
//         { $pull: { dishes: { _id: dishId } } },
//         { new: true }
//     );
// }

// async function editDishModel(providerId, dishId, updatedDishDetails) {
//     const provider = await Provider.findById(providerId);
//     const dish = provider.dishes.id(dishId);
    
//     Object.assign(dish, updatedDishDetails);
    
//     return await provider.save();
// }

// async function deleteDishModel(providerId, dishId) {
//     return await Provider.findByIdAndUpdate(
//         providerId,
//         { $pull: { dishes: { _id: dishId } } },
//         { new: true }
//     );
// }