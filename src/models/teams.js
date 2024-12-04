//Model for Team Schema
const knex = require('knex');
const knexConfig = require('../db/knex');

const db = knex(knexConfig.development);

// Create a new team in the database
// Each team contains a team number and a team name
class Team{
    constructor(team){
        this.team_number = team.team_number;
        this.team_name = team.team_name;
    }

    // Get all teams from the database
    static async getAll(){
        return db('teams');
    }

    // Get a team by its team number
    static async getByTeamNumber(team_number){
        return db('teams').where({team_number}).first();
    }

    // Create a new team in the database
    static async create(team){
        return db('teams').insert(team);
    }

    // Update a team in the database
    static async update(team_number, team){
        return db('teams').where({team_number}).update(team);
    }

    // Delete a team from the database
    static async delete(team_number){
        return db('teams').where({team_number}).del();
    }
}

module.exports = Team;