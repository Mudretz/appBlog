const express = require('express')
const Blog = require('../models/Blog')
const router = express.Router({ mergeParams: true })
const auth = require('../middleware/auth.middleware')

router.post('/', auth, async (req, res) => {
  try {
      const addBlog = await Blog.create(req.body);
      res.send(addBlog)
  } catch (e) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже'
    })
  }
})

router.get('/', async (req, res) => {
  try {
    const list = await Blog.find()
    res.send(list)
  } catch (e) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже'
    })
  }
})
router.delete('/:blogId', auth, async (req, res) => {
  try {
    const { blogId } = req.params
    const list = await Blog.findByIdAndDelete(blogId)
    res.send(list._id)
  } catch (e) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже'
    })
  }
})

router.patch('/:blogId', auth, async (req, res) => {
  try {
    const { blogId } = req.params
    if (blogId === req.body._id) {
      const updatedBlog = await Blog.findByIdAndUpdate(blogId, req.body, {new: true})
      res.send(updatedBlog)
    } else {
      res.status(401).json({message: 'Unauthorized'})
    }
  } catch (e) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже'
    })
  }
})



module.exports = router