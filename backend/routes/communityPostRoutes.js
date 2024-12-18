const express = require('express');
const router = express.Router();
const communityPostController = require('../controllers/communityPostController');
const auth = require('../middlewares/auth');

router.post('/create', auth.authenticate, communityPostController.createPost);
router.get('/', auth.authenticate, communityPostController.getPosts);
router.put('/:postId/update-images', auth.authenticate, communityPostController.updatePostImages);
router.delete('/:postId', auth.authenticate, communityPostController.deletePost);

module.exports = router;
