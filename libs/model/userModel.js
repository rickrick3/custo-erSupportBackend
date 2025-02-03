const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    role: {
        type: String,
        enum: ['Agent', 'Admin', 'Customer'],
        default:'Customer',
    },
    password: {type: String, required: true, unique: true},
    status: {
        type: String,
        enum: ['Online', 'Offline'],
        default: 'Online'
    },
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('User', userSchema)