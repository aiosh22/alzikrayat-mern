const mongoose = require('mongoose');
const User = require('../models/User');

// Basic authentication (Project 3): the client sends the logged-in user's id
// in the "x-user-id" header. JWT is the optional Project 4 upgrade.
const requireUser = async (req, res, next) => {
  try {
    const id = req.header('x-user-id');
    if (!id || !mongoose.isValidObjectId(id)) {
      return res.status(401).json({ message: 'Please login first' });
    }
    const user = await User.findById(id);
    if (!user) return res.status(401).json({ message: 'Please login first' });
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = requireUser;
