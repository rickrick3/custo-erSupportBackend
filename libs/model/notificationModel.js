const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema({
    recipientId: {
        type: mongoose.Schema.Types.ObjectId, required: true,
        ref: "User"
    },
    message: { type: String, required: true },
    status: { type: String, enum: ["unread", "read"], default: "unread" },
    createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Notification', notificationSchema)