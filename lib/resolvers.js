'use strict'

const queries = require('./queries');
module.exports = {
    Query: {
        getEnVivo: (_, args) => queries.enVivo(args)
    }
};