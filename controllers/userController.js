const bcrypt = require('bcrypt');
const { User } = require('../models');

// Register a new user
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword
    });

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

// Login an existing user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      res.status(401).send('No user found with this email');
      return;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      res.status(401).send('Incorrect password');
      return;
    }

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

// Logout the user
exports.logout = (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(err => {
      if (err) {
        res.status(500).send('Failed to log out, please try again.');
      } else {
        res.redirect('/');
      }
    });
  } else {
    res.redirect('/');
  }
};
