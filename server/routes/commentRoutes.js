const router = require('express').Router({ mergeParams: true });
const requireUser = require('../middleware/auth');
const validate = require('../middleware/validation');
const commentController = require('../controllers/commentController');

// mounted at /api/photos/:id/comments
router.get('/', commentController.getByPhoto);
router.post('/', requireUser, validate('comment'), commentController.create);

module.exports = router;
