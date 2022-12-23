const {Schema, model} = require('mongoose')

const schema = new Schema({
  name: {type: String, required: true},
  written: {type: String, required: true},
  text: {type: String, required: true},
  userId: {type: String, required: true},
  author: {type: String, required: true}
}, {
  timestamps: { createdAt: 'created_at' }
})

module.exports = model('Blog', schema)