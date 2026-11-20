const mongoose = require('mongoose');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: [true, 'firstName is required'], trim: true },
  lastName: { type: String, required: [true, 'lastName is required'], trim: true },
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [emailRegex, 'Invalid email format'],
  },
  password: { type: String, required: [true, 'password is required'] }, // bcrypt hash only
  location: { type: String, trim: true },
  description: { type: String, trim: true },
  occupation: { type: String, trim: true },
});

// Public profile: never expose the password hash
userSchema.methods.toPublic = function () {
  const { _id, firstName, lastName, email, location, description, occupation } = this;
  return { _id, firstName, lastName, email, location, description, occupation };
};

module.exports = mongoose.model('User', userSchema);
