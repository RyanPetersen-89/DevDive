const bcrypt = require('bcrypt');
const { User } = require('../models');

// Register a new user
exports.register = async (req, res) => {
  try {
    // This extracts info from request body
    const { username, email, password } = req.body;

    // This hashes the users password
    const hashedPassword = await bcrypt.hash(password, 10);

    // This creates new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword
    });

    // Start session
    req.session.save(() => {
      req.session.userId = newUser.id;
      req.session.username = newUser.username;
      req.session.loggedIn = true;

      res.redirect('/dashboard');
    });
  } catch (error) {
    console.error('Error registering new user:', error);
    res.status(500).send('Error registering new user.');
  }
};

// This will Login an existing user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // This checks for an existing user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(401).send('No user found with this email');
      return;
    }

    // This compares hashed passwords
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      res.status(401).send('Incorrect password');
      return;
    }

    // This starts session if login is successful
    req.session.save(() => {
      req.session.userId = user.id;
      req.session.username = user.username;
      req.session.loggedIn = true;

      res.redirect('/dashboard');
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).send('Error during login.');
  }
};

// This will logout the user
exports.logout = (req, res) => {
  if (req.session.loggedIn) {
    // This destroys the session and handles the response
    req.session.destroy(err => {
      if (err) {
        res.status(500).send('Failed to log out, please try again.');
      } else {
        res.redirect('/');
      }
    });
  } else {
    // If the user is not logged in, this redirects to the homepage
    res.redirect('/');
  }
};