const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');

const app = express();

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connection successful.');
  })
  .catch(() => {
    console.log('Connection failed.');
  });

app.use(express.json());
app.use('/images', express.static(path.join('backend/images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, PUT, OPTIONS'
  );
  next();
});

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
