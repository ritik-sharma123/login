const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const User = require('./models/user');

const app = express();

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/userDB');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


// Routes
app.post('/submit', async (req, res) => {
  const { username, email, password  } = req.body;

  try {
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.send('User saved successfully!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving user');
  }
});


// Server Start
app.listen(3000, () => {
  console.log('Server running at http://localhost:3000/index.html');
});
