const fs = require('fs');
const path = require('path');
const Joi = require('joi');

const schemas = {
  register: Joi.object({
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    location: Joi.string().allow('').optional(),
    description: Joi.string().allow('').optional(),
    occupation: Joi.string().allow('').optional(),
  }),
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
  photo: Joi.object({
    title: Joi.string().trim().max(100).required(),
    description: Joi.string().allow('').max(1000).optional(),
  }),
  comment: Joi.object({
    comment: Joi.string().trim().min(1).max(500).required(),
  }),
};

// Returns a middleware that validates req.body against a Joi schema
const validate = (name) => (req, res, next) => {
  const { error, value } = schemas[name].validate(req.body, { abortEarly: false, stripUnknown: true });
  if (error) {
    // remove an already-uploaded file if the metadata is invalid
    if (req.file) fs.unlink(path.join(__dirname, '..', 'uploads', req.file.filename), () => {});
    return res.status(400).json({ message: error.details.map((d) => d.message).join(', ') });
  }
  req.body = value;
  next();
};

module.exports = validate;
