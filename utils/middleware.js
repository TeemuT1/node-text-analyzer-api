const logger = require('./logger')

const requestLogger = (request, response, next) => {
  logger.info('Method: ', request.method)
  logger.info('Path: ', request.path)
  logger.info('Body: ', request.body)
  logger.info('---')
  next()
}

//if the request was made to a non-existing route
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

//not really needed in this example without a database or something
const errorHandler = (error, request, response, next) => {
  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}