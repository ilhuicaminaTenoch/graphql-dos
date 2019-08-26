'use strict'

const {MongoClient} = require('mongodb')
const {
    DB_USER,
    DB_PASSWD,
    DB_CLUSTER,
    DB_NAME,
    DB_HOST,
    DB_PORT
} = process.env
const mongoUrl = `mongodb+srv://${DB_USER}:${DB_PASSWD}@${DB_CLUSTER}/${DB_NAME}?retryWrites=true&w=majority`
let connection

async function connectDB() {
    if (connection) return connection

    let client
    try {
        client = await MongoClient.connect(mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        connection = client.db(DB_NAME)//client.db(`${DB_NAME}`)
    } catch (error) {
        console.log('Could not connect to db', mongoUrl, error)
        process.exit(1)
    }

    return connection
}

module.exports = connectDB

