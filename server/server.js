
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Sequelize, Model, DataTypes } = require('sequelize');

const app = express();
const port = 3001;

// Define your CORS options
// const corsOptions = {
//   origin: 'https://super-sniffle-q4v55jpj9wcqrq-3000.app.github.dev' , // Adjust this to match your React app's URL
//   methods: 'GET,HEAD,PUT,POST,DELETE',
//   headers: 'Origin, X-Requested-With, Content-Type, Accept',
//   credentials: true,
//   preflightContinue: false,
//   maxAge: 3600,
//   optionsSuccessStatus: 204
// };

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

// Sync models with database
sequelize.sync();

// Middleware for parsing request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Enable pre-flight for all routes
app.options('*', cors()); 

// Default path
app.get('/', (req, res) => {
    res.json({ message: "Hello from server!" });
  });

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
  

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
