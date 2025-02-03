const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type : String,  unique : true },
  role: {
    type: String,
    enum: ['Agent', 'Admin', 'Customer'],
    default:'Customer',
},
  password: { type: String, required: true },
  createdAt: { type : Date, default : Date.now}
});

module.exports = mongoose.model('Admin', adminSchema);