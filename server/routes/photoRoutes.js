const router = require('express').Router();
const requireUser = require('../middleware/auth');
const upload = require('../middleware/upload');
const validate = require('../middleware/validation');
const photoController = require('../controllers/photoController');

// mounted at /api/photos
router.get('/', photoController.getAll);
router.get('/:id', photoController.getOne);
router.post('/', requireUser, upload.single('image'), (req, res, next) => {
  if (!req.file) return res.status(400).json({ message: 'Image file is required' });
  next();
}, validate('photo'), photoController.create);
router.delete('/:id', requireUser, photoController.remove);

module.exports = router;
