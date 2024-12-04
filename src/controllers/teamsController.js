const Team = require('../models/teams');

// Get all teams
exports.getAllTeams = async (req, res) => {
    try {
        const teams = await Team.getAll();
        res.status(200).json(teams);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single team by ID
exports.getTeamById = async (req, res) => {
    try {
        const team = await Team.getByTeamNumber(req.params.id);
        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }
        res.status(200).json(team);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new team
exports.createTeam = async (req, res) => {
    const team = new Team(req.body);
    try {
        const newTeam = await team.create();
        res.status(201).json(newTeam);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a team by ID
exports.updateTeam = async (req, res) => {
    try {
        const team = await Team.update(req.params.id, req.body, { new: true, runValidators: true });
        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }
        res.status(200).json(team);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a team by ID
exports.deleteTeam = async (req, res) => {
    try {
        const team = await Team.delete(req.params.id);
        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }
        res.status(200).json({ message: 'Team deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};