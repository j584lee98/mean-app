const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const Post = require('./models/post');

const app = express();

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connection successful.');
  })
  .catch(() => {
    console.log('Connection failed.');
  });

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, PUT, OPTIONS'
  )
  next();
})

app.post('/api/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(newPost => {
    res.status(201).json({
      message: 'Post added successfully',
      postId: newPost._id
    });
  });
});

app.get('/api/posts', (req, res, next) => {
  Post.find()
    .then(posts => {
      res.status(200).json({
        message: 'Post fetched successfully',
        posts: posts
      });
    });
});

app.delete('/api/posts/:id', (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({
      message: 'Post deleted successfully'
    });
  });
})

module.exports = app;
