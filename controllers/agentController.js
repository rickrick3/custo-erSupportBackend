const Agent = require('../libs/model/agentModel');
const Admin = require('../libs/model/adminModel');
const notification = require('../services/notificationService');

exports.createAgent = async (req, res) => {
    try {
        const agent = await Agent.create(req.body);

        // Retrieve all admins with the role 'Admin'
        const admins = await Admin.find({ role: 'Admin' });
        if (admins && admins.length > 0) {
            admins.forEach(admin => {
                // Ensure that an email exists for each admin before sending the notification
                if (admin.email) {
                    notification.sendNotification(
                        admin.email,
                        `Notification for Admin`,
                        `A new agent '${agent.username}' has been created.`
                    );
                }
            });
        }

        res.status(201).json({ message: 'Agent created successfully', agent });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAgents = async (req, res) => {
    try {
        const agents = await Agent.find();
        res.status(200).json({ agents });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateAgent = async (req, res) => {
    try {
        const agent = await Agent.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!agent) return res.status(404).json({ message: 'Agent not found' });
        
        res.status(200).json({ message: 'Agent updated successfully', agent });
        
        // Notify the agent about the profile update
        if (agent.email) {
            notification.sendNotification(
                agent.email,
                `Notification for ${agent.username}`,
                `Your profile has been updated.`
            );
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteAgent = async (req, res) => {
    try {
        const agent = await Agent.findByIdAndDelete(req.params.id);
        if (!agent) return res.status(404).json({ message: 'Agent not found' });
        
        res.status(200).json({ message: 'Agent deleted successfully' });
        
        // Notify the agent about the profile deletion
        if (agent.email) {
            notification.sendNotification(
                agent.email,
                `Notification for ${agent.name}`,
                `Your profile has been deleted.`
            );
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
