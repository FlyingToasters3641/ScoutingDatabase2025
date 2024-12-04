const express = require('express');
const teamsController = require('../controllers/teamsController');

const router = express.Router();

// Get all teams
router.get('/', teamsController.getAllTeams);

// Get a single team by ID
router.get('/:id', teamsController.getTeamById);

// Create a new team
router.post('/', teamsController.createTeam);

// Update a team by ID
router.put('/:id', teamsController.updateTeam);

// Delete a team by ID
router.delete('/:id', teamsController.deleteTeam);

module.exports = router;
