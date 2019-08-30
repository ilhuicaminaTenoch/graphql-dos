'use strict'

const queries = require('./queries');
module.exports = {
    Query: {
        getEnVivo: (rootValue, args) => queries.enVivo(args)
    }
};