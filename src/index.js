const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/teamRoute');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/team', routes);

  // // Serve static files from the React app build
  // app.use(express.static(path.join(__dirname, '../client/build')));

  // // Fallback to React for any unmatched routes
  // app.get('*', (req, res) => {
  //   res.sendFile(path.join(__dirname, '../client/build/index.html'));
  // });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
