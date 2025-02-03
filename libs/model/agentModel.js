const mongoose = require("mongoose")

const agentSchema = new mongoose.Schema({
    name: { type : String, required : true },
    email: { type : String, required : true},
    assignedTickets : {type: mongoose.Schema.Types.ObjectId, ref: 'Ticket'},
    createdAt: { type: Date, default : Date.now }
});

module.exports = mongoose.model('Agent', agentSchema)