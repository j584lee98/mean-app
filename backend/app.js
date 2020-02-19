const express = require('express');

const app = express();

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
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message: 'Post added successfully'
  });
});

app.get('/api/posts', (req, res, next) => {
  const posts = [
    {
      id: 'asdfsadf',
      title: 'First post',
      content: 'First post content'
    },
    {
      id: 'lgkegk',
      title: 'Second post',
      content: 'Second post content'
    },
    {
      id: 'qwetk',
      title: 'Third post',
      content: 'Third post content'
    },
  ];
  res.status(200).json({
    message: 'Post fetched successfully',
    posts: posts
  });
});

module.exports = app;
