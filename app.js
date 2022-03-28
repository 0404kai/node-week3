const path = require('path');
const cors = require('cors');
const express = require('express');
const error = require('http-errors');

const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE.replace(
    '<password>',
    process.env.DATABASE_PASSWORD
  );
  
mongoose
.connect(DB)
.then(() => console.log('資料庫連接成功'));

var PostsRouter = require('./routes/posts');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/posts', PostsRouter);

app.use((req, res, next) =>{
  res.status(404).json({
    status: 'false',
    message: error(404, '找不到網站！')
  })
  next();
});

app.use((err, req, res, next) =>{
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500).json({
    status: err.status || 500,
    message: err.message
  });
});

app.listen(process.env.PORT)