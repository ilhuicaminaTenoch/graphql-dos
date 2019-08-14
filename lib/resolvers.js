'use strict'

/*const coneectDb = require('./db');
const {ObjectID} =  require('mongodb')*/
const Cliente = require('./Cliente')
const ClaseEnVivo = require('../modelo/EnVivo')

module.exports = {
    getEnVivo: (rootValue) => {
        const EnVivo = Cliente.getApi(rootValue).then((data) => {
            const ui = rootValue.ui
            const datos = ClaseEnVivo.programas(data, ui)
            
            return datos
            

        })

        return EnVivo
    }

}