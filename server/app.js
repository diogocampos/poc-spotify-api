const express = require('express')

const { errorHandler, notFound } = require('./middleware')
const checkoutRouter = require('./routes/checkout')

const app = express()
app.use(express.json())

app.use('/checkout', checkoutRouter)

app.use(notFound)
app.use(errorHandler)

module.exports = app
