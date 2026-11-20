// Central error handler: always answers with JSON
module.exports = (err, req, res, next) => {
  if (err.name === 'MulterError') {
    return res.status(400).json({ message: err.code === 'LIMIT_FILE_SIZE' ? 'Image must be 5MB or less' : err.message });
  }
  if (err.name === 'ValidationError') return res.status(400).json({ message: err.message });
  if (err.name === 'CastError') return res.status(400).json({ message: 'Invalid id' });
  if (err.code === 11000) return res.status(409).json({ message: 'Email already registered' });
  console.error(err);
  res.status(err.status || 500).json({ message: err.status ? err.message : 'Server error' });
};
