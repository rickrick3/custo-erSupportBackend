const mongoose = require("mongoose")

const teamSchema = new mongoose.Schema({
    name: { type : String, required : true},
    agents: [{ type : mongoose.Schema.Types.ObjectId, ref: "Agent"}],
    createdAt: { type : Date, default: Date.now}
})

module.exports = mongoose.model('Team', teamSchema)