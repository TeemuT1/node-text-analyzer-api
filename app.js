
const express = require('express')
const app = express()
const analyzeRouter = require('./controllers/analyze')
const middleware = require('./utils/middleware')

app.use(express.json())
app.use(middleware.requestLogger)
app.use('/analyze', analyzeRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app