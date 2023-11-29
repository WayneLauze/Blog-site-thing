
// this file is for authentication routes
// so we need to import the User model and bcrypt
// because we need to save users to the database
// and hash passwords before saving them

// this file is called in server/index.js

const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user'); // adjust the path according to your project structure
const router = express.Router();

// register a new user
router.post('/register', async (req, res) => {
      const { username, password } = req.body;
      const user = new User({ username, password });
      try {
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
      } catch (error) {
        res.status(500).json({ message: 'Error registering user' });
      }
});

// login a user
router.post('/login', async (req, res) => {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      
      // check if the username exists 
        // and if the password is correct 
        // (compare the hashed password in the database with the hashed password sent from the client)
      if (!user || !bcrypt.compareSync(password, user.password)) {
        res.status(401).json({ message: 'Invalid username or password' });
        return;
      }
      req.session.userId = user._id;
      res.json({ message: 'Logged in successfully' });
});

module.exports = router;