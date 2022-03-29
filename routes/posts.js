const express = require('express');
const router = express.Router();
const Post = require('../models/posts');
const {success, error}  = require('../statusCode/statusHandle')

router
.get('/', async(req, res, next) =>  {
  const post = await Post.find();
  success(res, post);
})
.post('/', async(req, res, next) =>  {
  try{
      const data = req.body;
      if(data.title !== undefined){
          const newPost = await Post.create(
              {
                  title: data.title
              }
          );
          success(res, newPost);
      }else{
        error(res);
      }
  }catch{
    error(res);
  }
})
.delete('/', async(req, res, next)=>{
  const post = await Post.deleteMany({});
  res.status(200).json({
      status: 'success',
      message: '刪除成功！'
  });
})
.delete('/:id', async(req, res, next)=>{
  try{
    const id = req.params.id;
    await Post.findByIdAndDelete(id);
    res.status(200).json({
        status: 'success',
        message: '刪除單筆成功！'
    });
  }catch{
    error(res);
  }
})
.patch('/:id', async(req, res, next)=>{
  try{
      const data = req.body;
      const id = req.params.id;
      if(data.title !== undefined){
          const editContent = {
              title: data.title,
          };
          const editPost = await Post.findByIdAndUpdate(id,editContent);
          success(res, editPost);
      }else{
          error(res);
      }
  }catch{
    error(res);
  }
});

module.exports = router;