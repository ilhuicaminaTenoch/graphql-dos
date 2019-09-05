'use strict'

const queries = require('./queries');
module.exports = {
    Query: {
        programs: (rootValue, args) => queries.enVivo(args)
    }
};