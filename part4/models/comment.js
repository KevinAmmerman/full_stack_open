const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
    minLength: 3,
  },
  createdAt: { type: Date, default: Date.now },
})

commentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = {
  schema: commentSchema,
  model: Comment,
}
