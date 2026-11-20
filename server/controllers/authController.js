const bcrypt = require('bcrypt');
const User = require('../models/User');

// POST /api/auth/register
exports.register = async (req, res, next) => {
  try {
    const exists = await User.findOne({ email: req.body.email.toLowerCase() });
    if (exists) return res.status(409).json({ message: 'Email already registered' });

    const hash = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({ ...req.body, password: hash });
    res.status(201).json(user.toPublic());
  } catch (err) {
    next(err);
  }
};

// POST /api/auth/login
exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email.toLowerCase() });
    const ok = user && (await bcrypt.compare(req.body.password, user.password));
    if (!ok) return res.status(401).json({ message: 'Invalid email or password' });
    res.json(user.toPublic());
  } catch (err) {
    next(err);
  }
};
