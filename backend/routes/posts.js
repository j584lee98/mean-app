const express = require('express');
const router = express.Router();

const PostsController = require('../controllers/posts');

const checkAuth = require('../middleware/check-auth');
const extractImg = require('../middleware/extract-img');

router.post('', checkAuth, extractImg, PostsController.createPost);

router.put('/:id', checkAuth, extractImg, PostsController.updatePost);

router.get('', PostsController.getPosts);

router.get('/:id', PostsController.getPost);

router.delete('/:id', checkAuth, PostsController.deletePost);

module.exports = router;
