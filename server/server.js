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

// Define User model
class User extends Model {}
User.init({
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING
}, { sequelize, modelName: 'user' });

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
    res.json({ message: "Hello from server!" });
  });
// ######################################################################

// ######################################################################
// CRUD routes for User model
app.get('/api/v1/users', async (req, res) => {
    const users = await User.findAll();
    res.json(users);
  });

app.get('/api/v1/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    res.json(user);
  });
  
app.post('/api/v1/users', async (req, res) => {
    const user = await User.create(req.body);
    res.json(user);
  });
  
app.put('/api/v1/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (user) {
      await user.update(req.body);
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  });
  
app.delete('/api/v1/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (user) {
      await user.destroy();
      res.json({ message: 'User deleted' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  });

// ######################################################################

// ######################################################################
// CRUD routes for FRCEvent model
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
app.get('/api/v1/teams', async (req, res) => {
  const teams = await Teams.findAll();
  res.json(teams);
});

app.get('/api/v1/teams/:id', async (req, res) => {
  const teams = await Teams.findByPk(req.params.id);
  res.json(teams);
});

app.post('/api/v1/teams', async (req, res) => {
  const teams = await Teams.create(req.body);
  res.json(teams);
});

// ######################################################################

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
