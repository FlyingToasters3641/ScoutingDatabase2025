const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Sequelize, Model, DataTypes } = require('sequelize');

const app = express();
const port = 3001;

// Use the CORS middleware
//app.use(cors(corsOptions));
app.use(cors());

// Create Sequelize instance
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
  });

// ######################################################################
// Database models Definitions
//  ____        _        _                      __  __           _      _     
// |  _ \  __ _| |_ __ _| |__   __ _ ___  ___  |  \/  | ___   __| | ___| |___ 
// | | | |/ _` | __/ _` | '_ \ / _` / __|/ _ \ | |\/| |/ _ \ / _` |/ _ \ / __|
// | |_| | (_| | || (_| | |_) | (_| \__ \  __/ | |  | | (_) | (_| |  __/ \__ \
// |____/ \__,_|\__\__,_|_.__/ \__,_|___/\___| |_|  |_|\___/ \__,_|\___|_|___/
                                                                          
// // Define User model
// class User extends Model {}
// User.init({
//   name: DataTypes.STRING,
//   email: DataTypes.STRING,
//   password: DataTypes.STRING
// }, { sequelize, modelName: 'user' });

// Define FRCEvents model
class FRCEvents extends Model {}
FRCEvents.init({
  name: DataTypes.STRING,
  key: DataTypes.STRING
}, { sequelize, modelName: 'frcevents' });

// Define Teams model
class Teams extends Model {}
Teams.init({
  teamNumber: DataTypes.INTEGER,
  nickname: DataTypes.STRING,
  city: DataTypes.STRING,
  state_prov: DataTypes.STRING,
  country: DataTypes.STRING
}, { sequelize, modelName: 'teams' });

// Define match model
class EventTeams extends Model {}
EventTeams.init({
  event_id: DataTypes.INTEGER,
  team_id: DataTypes.INTEGER
}, { sequelize, modelName: 'eventteams' })

// Define match model
class Match extends Model {}
Match.init({
  matchNumber: DataTypes.INTEGER,
  blueScore: DataTypes.INTEGER,
  redScore: DataTypes.INTEGER,
  redOneTeamNumber: DataTypes.INTEGER,
  redTwoTeamNumber: DataTypes.INTEGER,
  redThreeTeamNumber: DataTypes.INTEGER,
  blueOneTeamNumber: DataTypes.INTEGER,
  blueTwoTeamNumber: DataTypes.INTEGER,
  blueThreeTeamNumber: DataTypes.INTEGER,
  redRankingPoints: DataTypes.INTEGER,
  blueRankingPoints: DataTypes.INTEGER,
  matchKey: DataTypes.STRING,
  event_id: DataTypes.INTEGER
}, { sequelize, modelName: 'matches' });

// Define match model
class MatchData extends Model {}
MatchData.init({
  scouterName: DataTypes.STRING,
  matchNumber: DataTypes.INTEGER,
  teamNumber: DataTypes.INTEGER,
  eventKey: DataTypes.STRING,
  matchKey: DataTypes.STRING,
  event_id: DataTypes.INTEGER,
  position: DataTypes.STRING,
  uniqueId: DataTypes.STRING
}, { sequelize, modelName: 'matchdata' });

// ######################################################################

// Sync models with database
sequelize.sync();

// Middleware for parsing request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Enable pre-flight for all routes
app.options('*', cors()); 

// ######################################################################
// Default path
app.get('/', (req, res) => {
    res.json({ "Error": "Invalid endpoint" });
  });
// ######################################################################

// ######################################################################
// CRUD routes for User model
//  _   _                    _    ____ ___     
// | | | |___  ___ _ __     / \  |  _ \_ _|___ 
// | | | / __|/ _ \ '__|   / _ \ | |_) | |/ __|
// | |_| \__ \  __/ |     / ___ \|  __/| |\__ \
//  \___/|___/\___|_|    /_/   \_\_|  |___|___/

// app.get('/api/v1/users', async (req, res) => {
//     const users = await User.findAll();
//     res.json(users);
//   });

// app.get('/api/v1/users/:id', async (req, res) => {
//     const user = await User.findByPk(req.params.id);
//     res.json(user);
//   });
  
// app.post('/api/v1/users', async (req, res) => {
//     const user = await User.create(req.body);
//     res.json(user);
//   });
  
// app.put('/api/v1/users/:id', async (req, res) => {
//     const user = await User.findByPk(req.params.id);
//     if (user) {
//       await user.update(req.body);
//       res.json(user);
//     } else {
//       res.status(404).json({ message: 'User not found' });
//     }
//   });
  
// app.delete('/api/v1/users/:id', async (req, res) => {
//     const user = await User.findByPk(req.params.id);
//     if (user) {
//       await user.destroy();
//       res.json({ message: 'User deleted' });
//     } else {
//       res.status(404).json({ message: 'User not found' });
//     }
//   });

// ######################################################################

// ######################################################################
// CRUD routes for FRCEvent model
//  _____                 _            _    ____ ___     
// | ____|_   _____ _ __ | |_ ___     / \  |  _ \_ _|___ 
// |  _| \ \ / / _ \ '_ \| __/ __|   / _ \ | |_) | |/ __|
// | |___ \ V /  __/ | | | |_\__ \  / ___ \|  __/| |\__ \
// |_____| \_/ \___|_| |_|\__|___/ /_/   \_\_|  |___|___/

app.get('/api/v1/events', async (req, res) => {
    const frcevents = await FRCEvents.findAll();
    res.json(frcevents);
});

app.get('/api/v1/events/:id', async (req, res) => {
  const frcevents = await FRCEvents.findByPk(req.params.id);
  res.json(frcevents);
});

app.post('/api/v1/events', async (req, res) => {
    const frcevents = await FRCEvents.create(req.body);
    res.json(frcevents);
});

app.delete('/api/v1/events/:id', async (req, res) => {
  const frcevents = await FRCEvents.findByPk(req.params.id);
  if (frcevents) {
    await frcevents.destroy();
    res.json({ message: 'Event deleted' });
  } else {
    res.status(404).json({ message: 'Event not found' });
  }
});

// ######################################################################
  
// ######################################################################
// CRUD routes for teams model
//  _____                             _    ____ ___     
// |_   _|__  __ _ _ __ ___  ___     / \  |  _ \_ _|___ 
//   | |/ _ \/ _` | '_ ` _ \/ __|   / _ \ | |_) | |/ __|
//   | |  __/ (_| | | | | | \__ \  / ___ \|  __/| |\__ \
//   |_|\___|\__,_|_| |_| |_|___/ /_/   \_\_|  |___|___/

app.get('/api/v1/teams', async (req, res) => {
  const teams = await Teams.findAll();
  res.json(teams);
});

app.get('/api/v1/teams/:id', async (req, res) => {
  const teams = await Teams.findByPk(req.params.id);
  res.json(teams);
});

app.get('/api/v1/teams/number/:id', async (req, res) => {
  const teams = await Teams.findAll({
    where: {
      teamNumber: req.params.id,
    },
  });
  res.json(teams);
});

app.post('/api/v1/teams', async (req, res) => {
  const teams = await Teams.create(req.body);
  res.json(teams);
});

app.delete('/api/v1/teams/:id', async (req, res) => {
  const teams = await Teams.findByPk(req.params.id);
  if (teams) {
    await teams.destroy();
    res.json({ message: 'Team deleted' });
  } else {
    res.status(404).json({ message: 'Team not found' });
  }
  });

// ######################################################################

// ######################################################################
// CRUD routes for connecting teams and events together model
//  _____                 _  _____                              _    ____ ___     
// | ____|_   _____ _ __ | ||_   _|__  __ _ _ __ ___  ___      / \  |  _ \_ _|___ 
// |  _| \ \ / / _ \ '_ \| __|| |/ _ \/ _` | '_ ` _ \/ __|    / _ \ | |_) | |/ __|
// | |___ \ V /  __/ | | | |_ | |  __/ (_| | | | | | \__ \   / ___ \|  __/| |\__ \
// |_____| \_/ \___|_| |_|\__||_|\___|\__,_|_| |_| |_|___/  /_/   \_\_|  |___|___/

app.get('/api/v1/eventteams', async (req, res) => {
  const teams = await EventTeams.findAll();
  res.json(teams);
});

app.get('/api/v1/eventteams/:id', async (req, res) => {
const results = await sequelize.query(
  "SELECT table2.id, teamNumber, nickname FROM eventteams AS table1 LEFT Join teams AS table2 ON table1.team_id = table2.id WHERE table1.event_id=:id",{
  replacements: {id: req.params.id},
  type: Sequelize.QueryTypes.SELECT});
res.json(results);
});

app.post('/api/v1/eventteams', async (req, res) => {
  const eventteams = await EventTeams.create(req.body);
  res.json(eventteams);
});

app.delete('/api/v1/eventteams/:id', async (req, res) => {
const eventteams = await EventTeams.findByPk(req.params.id);
if (eventteams) {
  await eventteams.destroy();
  res.json({ message: 'EventTeam deleted' });
} else {
  res.status(404).json({ message: 'EventTeam not found' });
}
});

// ######################################################################

// ######################################################################
// CRUD routes for matches model
//  __  __       _       _                     _    ____ ___     
// |  \/  | __ _| |_ ___| |__   ___  ___      / \  |  _ \_ _|___ 
// | |\/| |/ _` | __/ __| '_ \ / _ \/ __|    / _ \ | |_) | |/ __|
// | |  | | (_| | || (__| | | |  __/\__ \   / ___ \|  __/| |\__ \
// |_|  |_|\__,_|\__\___|_| |_|\___||___/  /_/   \_\_|  |___|___/

app.get('/api/v1/matches', async (req, res) => {
  const match = await Match.findAll();
  res.json(match);
});

app.get('/api/v1/matches/:id', async (req, res) => {
  const match = await Match.findAll({
    where: {
      event_id: req.params.id,
    },
    order: [
      ['matchNumber', 'ASC'],
    ],
  });
  res.json(match);
});
  
app.get('/api/v1/match/:id', async (req, res) => {
const match = await Match.findByPk(req.params.id);
res.json(match);
});

app.post('/api/v1/match', async (req, res) => {
  const match = await Match.create(req.body);
  res.json(match);
});

app.delete('/api/v1/match/:id', async (req, res) => {
const match = await Match.findByPk(req.params.id);
if (match) {
  await match.destroy();
  res.json({ message: 'Match deleted' });
} else {
  res.status(404).json({ message: 'Match not found' });
}
});

// ######################################################################

// ######################################################################
// CRUD routes for matchData model
//  __  __       _       _     ____        _              _    ____ ___     
// |  \/  | __ _| |_ ___| |__ |  _ \  __ _| |_ __ _      / \  |  _ \_ _|___ 
// | |\/| |/ _` | __/ __| '_ \| | | |/ _` | __/ _` |    / _ \ | |_) | |/ __|
// | |  | | (_| | || (__| | | | |_| | (_| | || (_| |   / ___ \|  __/| |\__ \
// |_|  |_|\__,_|\__\___|_| |_|____/ \__,_|\__\__,_|  /_/   \_\_|  |___|___/

app.get('/api/v1/matchData', async (req, res) => {
  const matchdata = await MatchData.findAll();
  res.json(matchdata);
});

app.get('/api/v1/matchData/:id', async (req, res) => {
const matchdata = await MatchData.findByPk(req.params.id);
res.json(matchdata);
});

app.get('/api/v1/matchData/uniqueid/:id', async (req, res) => {
  const matchdata = await MatchData.findAll({
    where: {
      uniqueId: req.params.id,
    },
  });
  res.json(matchdata);
});

app.get('/api/v1/matchData/matchkey/:id', async (req, res) => {
  const matchdata = await MatchData.findAll({
    where: {
      matchKey: req.params.id,
    },
    order: [
      ['position', 'ASC'],
    ],
  });
  res.json(matchdata);
});

app.post('/api/v1/matchData', async (req, res) => {
  const matchdata = await MatchData.create(req.body);
  res.json(matchdata);
});

app.delete('/api/v1/matchData/:id', async (req, res) => {
const matchdata = await matchdata.findByPk(req.params.id);
if (matchdata) {
  await matchdata.destroy();
  res.json({ message: 'MatchData deleted' });
} else {
  res.status(404).json({ message: 'MatchData not found' });
}
});

// ######################################################################

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
