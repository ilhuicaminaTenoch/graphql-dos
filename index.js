'use strict'

//require('dotenv').config();

const { buildSchema } = require('graphql')
const express = require('express')
const gqlMiddleware = require('express-graphql')
const  { readFileSync } = require('fs')
const { join } = require('path')
const resolvers = require('./lib/resolvers')

const app = express()
const port = process.env.port || 3000

// Definiendo el esquema
const shema = buildSchema(
    readFileSync(
        join(__dirname, 'schemas', 'enVivo.graphql'),
        'utf-8'
    )
)
app.use('/api', gqlMiddleware({
  schema: shema,
  rootValue: resolvers,
  graphiql: true
}))

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}/api`)
})
