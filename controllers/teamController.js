const Team = require("../libs/model/teamModel");
const Admin = require("../libs/model/adminModel");
const notification = require("../services/notificationService");

exports.createTeam = async (req, res) => {
    try {
        const team = await Team.create(req.body);
        const admins = await Admin.find({ role: "Admin" });

        if (admins.length > 0) {
            admins.forEach(admin => {
                notification.sendNotification(admin.email, `A new team '${team.name}' has been created.`);
            });
        }

        res.status(201).json({ message: "Team created successfully", team });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getTeams = async (req, res) => {
    try {
        const teams = await Team.find();
        res.status(200).json({ teams });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateTeam = async (req, res) => {
    try {
        const team = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!team) return res.status(404).json({ message: "Team not found" });

        const admins = await Admin.find({ role: "Admin" });
        if (admins.length > 0) {
            admins.forEach(admin => {
                notification.sendNotification(admin.email, `The team '${team.name}' has been updated.`);
            });
        }

        res.status(200).json({ message: "Team updated successfully", team });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteTeam = async (req, res) => {
    try {
        const team = await Team.findByIdAndDelete(req.params.id);
        if (!team) return res.status(404).json({ message: "Team not found" });

        const admins = await Admin.find({ role: "Admin" });
        if (admins.length > 0) {
            admins.forEach(admin => {
                notification.sendNotification(admin.email, `The team '${team.name}' has been deleted.`);
            });
        }

        res.status(200).json({ message: "Team deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
