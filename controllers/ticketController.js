const Ticket = require("../libs/model/ticketModel")
const Admin = require("../libs/model/adminModel")
const Notifications = require("../services/notificationService")
const Agent = require("../libs/model/agentModel")

exports.createTicket = async (req, res) => {
    try{
        const ticket = await Ticket.create(req.body)

        const admin = await Admin.find({role : 'Admin'})
        if (admin) {
            Notifications.sendNotification(admin.email, `A new ticket '${ticket.subject}' has been created.`);
        }
        res.status(201).json({ message: 'Ticket created successfully', ticket: ticket })
}catch(error){
    res.status(500).json({error: error.message})
}
}

exports.getTickets = async (req, res) => {
    try{
        const tickets = await Ticket.find()
        res.status(200).json(tickets)
    }catch(error){
        res.status(500).json({error: error.message})
    }
}

exports.updateTicket = async (req, res) => {
    try{
        const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
            new : true,
        })

        const agent = await Agent.find({assignedTickets:ticket.id })
        if(!ticket) return res.status(404).json({message: 'Ticket not found!'})
        res.status(200).json(ticket)
        if (agent){
            Notifications.sendNotification(agent.email, `Your Ticket has been updated.`)
        }
    }catch(error){
        res.status(500).json({error: error.message})
    }
}

exports.deleteTicket = async (req, res) => {
    try{
        const ticket = await Ticket.findByIdAndDelete(req.params.id)

        const agent = await Agent.find({assignedTickets:ticket.id })
        if(!ticket) return res.status(404).json({message : 'Ticket not found!'})
        res.status(200).json(ticket)
        if (agent){
            Notifications.sendNotification(agent.email, `Your Ticket has been deleted.`)
        }
    }catch(error){
        res.status(500).json({error: error.message})
    }
}