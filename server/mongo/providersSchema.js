const mongoose = require("mongoose");
const { Schema } = mongoose;

const dishSchema = new Schema({
  dishName: { type: String, required: true },
  ingredients: [{ type: String, required: true }],
  allergies: { type: Array },
  onMenu: { type: Boolean, default: true },  
  mayContain: [{ type: String }],
  freeText: { type: String },  
});

const providerSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, default: "provider" },
  dishes: [dishSchema],
  date: { type: Date, default: Date.now },
});

const Provider = mongoose.model("Provider", providerSchema);

module.exports = { Provider };
