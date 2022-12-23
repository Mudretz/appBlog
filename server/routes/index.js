const express = require('express')
const router = express.Router({ mergeParams: true })

router.use('/auth', require('./auth.routes'))
router.use('/comment', require('./comment.routes'))
router.use('/quality', require('./quality.routes'))
router.use('/profession', require('./profession.routes'))
router.use('/user', require('./user.routes'))
router.use("/blog", require("./blog.routes"))
router.use('/blogComment', require('./blogComment.routes'))


module.exports = router