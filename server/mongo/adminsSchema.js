const mongoose = require('mongoose');
const { Schema } = mongoose;

const adminSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, default: 'admin' }, 
  date: { type: Date, default: Date.now },
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = { Admin };
