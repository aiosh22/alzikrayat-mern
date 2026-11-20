const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Photo = require('../models/Photo');
const Comment = require('../models/Comment');

const ownerFields = 'firstName lastName';

// GET /api/photos
exports.getAll = async (req, res, next) => {
  try {
    const photos = await Photo.find().sort({ dateTime: -1 }).populate('userId', ownerFields);
    res.json(photos);
  } catch (err) {
    next(err);
  }
};

// GET /api/photos/:id
exports.getOne = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: 'Invalid id' });
    const photo = await Photo.findById(req.params.id).populate('userId', ownerFields);
    if (!photo) return res.status(404).json({ message: 'Photo not found' });
    res.json(photo);
  } catch (err) {
    next(err);
  }
};

// POST /api/photos  (logged-in users only, multipart/form-data)
exports.create = async (req, res, next) => {
  try {
    const photo = await Photo.create({
      userId: req.user._id,
      fileName: req.file.filename,
      title: req.body.title,
      description: req.body.description,
    });
    res.status(201).json(photo);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/photos/:id  (owner only)
exports.remove = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: 'Invalid id' });
    const photo = await Photo.findById(req.params.id);
    if (!photo) return res.status(404).json({ message: 'Photo not found' });

    // ownership check, server-side
    if (photo.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You can only delete your own photos' });
    }

    await Comment.deleteMany({ photoId: photo._id });
    await photo.deleteOne();
    fs.unlink(path.join(__dirname, '..', 'uploads', photo.fileName), () => {}); // remove the file too
    res.json({ message: 'Photo deleted' });
  } catch (err) {
    next(err);
  }
};
