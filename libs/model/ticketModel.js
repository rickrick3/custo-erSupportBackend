const mongoose = require("mongoose")

const ticketSchema = new mongoose.Schema({
    ticketName: {type: String, required: true},
    description: {type: String, required: true},
    status: {
        type: String,
        enum:['Open', 'In Progress', 'closed'],
        default: 'Open'
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High', 'Urgent'],
        default: 'Medium'
    },
    assignedAgent: {
        type: mongoose.Schema.Types.ObjectId, ref: "Agent"
    },
    createdAt: {type: Date, default: Date.now}

})

module.exports = mongoose.model('Ticket', ticketSchema)