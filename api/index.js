const express = require('express');
const logger = require('morgan');
const cors = require('cors');

require('dotenv').config();
require('./models/User');
require('./models/Post');
const connectDB = require('./db');
const routes = require('./routes');

const app = express();
const port = 8500;

connectDB();

app.use(logger('dev'));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('hello world');
});

app.use('/', routes);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
