const express = require('express')
const auth = require('../middleware/auth.middleware')
const BlogComment = require('../models/BlogComment')
const router = express.Router({ mergeParams: true })

router
  .route('/')
  .get(async (req, res) => {
    try {
      const {orderBy, equalTo} = req.query
      const list = await BlogComment.find({ [orderBy]: equalTo })
      res.send(list)
    } catch (e) {
      res.status(500).json({
        message: 'На сервере произошла ошибка. Попробуйте позже'
      })
    }
  })
  .post(auth, async (req, res) => {
    try {
      const newBlogComment = await BlogComment.create({
        ...req.body,
        userId: req.user._id
      })
      res.status(201).send(newBlogComment)
    } catch (e) {
      res.status(500).json({
        message: 'На сервере произошла ошибка. Попробуйте позже'
      })
    }
  })

router.delete('/:blogCommentId', auth, async (req, res) => {
  try {
    const { blogCommentId } = req.params
    const removedBlogComment = await BlogComment.findById(blogCommentId)

    if (removedBlogComment.userId.toString() === req.user._id) {
      await removedBlogComment.remove()
      return res.send(null)
    } else {
      res.status(401).json({message: 'Unauthorized'})
    }
  } catch (e) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже'
    })
  }
})


router.delete('/:all/:pageId', auth, async (req, res) => {
  try {
    const { pageId } = req.params
    const removedBlogAllComments = await BlogComment.find()
    for (i=0; i < removedBlogAllComments.length; i++) {
      if (removedBlogAllComments[i].pageId.toString() === pageId) {
        await BlogComment.findByIdAndDelete(removedBlogAllComments[i]._id)
      }
    }
    res.send(null);
  } catch (e) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже'
    })
  }
})


module.exports = router