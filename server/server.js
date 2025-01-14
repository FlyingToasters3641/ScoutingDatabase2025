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
// CRUD routes for User model
app.get('/users', async (req, res) => {
    const users = await User.findAll();
    res.json(users);
  });

app.get('/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    res.json(user);
  });
  
app.post('/users', async (req, res) => {
    const user = await User.create(req.body);
    res.json(user);
  });
  
app.put('/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (user) {
      await user.update(req.body);
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  });
  
app.delete('/users/:id', async (req, res) => {
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
app.get('/events', async (req, res) => {
    const frcevents = await FRCEvents.findAll();
    res.json(frcevents);
});

app.get('/events/:id', async (req, res) => {
  const frcevents = await FRCEvents.findByPk(req.params.id);
  res.json(frcevents);
});

app.post('/events', async (req, res) => {
    const frcevents = await FRCEvents.create(req.body);
    res.json(frcevents);
});

app.delete('/events/:id', async (req, res) => {
  const frcevents = await FRCEvents.findByPk(req.params.id);
  if (frcevents) {
    await frcevents.destroy();
    res.json({ message: 'User deleted' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// ######################################################################
  

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
