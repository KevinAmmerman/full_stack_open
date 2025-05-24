const logger = require('./logger')
const jwt = require('jsonwebtoken')

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)
  if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).json({ error: 'expected `username` to be unique' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'token invalid' })
  }
  next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '')
  }
  next()
}

const userExtractor = (request, response, next) => {
  try {
    if (!request.token) return response.status(401).json({ error: 'token missing or invalid' })
    const user = jwt.verify(request.token, process.env.SECRET)
    if (!user.id) {
      return response.status(401).json({ error: 'token invalid' })
    } else {
      request.user = user
    }
    next()
  } catch (exception) {
    next(exception)
  }
}

module.exports = {
  errorHandler,
  tokenExtractor,
  userExtractor,
}
