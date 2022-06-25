require('dotenv').config()
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const connectDB = require('./config/db')
const schema = require('./schema/schema')
const colors = require('colors')
const port = process.env.PORT || 4040
const app = express()

// Connect to MongoDB
connectDB()

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: process.env.NODE_ENV === 'development'
  
}))

app.listen(port, console.log('Server Running on port: '.brightGreen.bold, port.brightCyan.bold))
