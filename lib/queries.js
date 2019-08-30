'use strict'
const Cliente = require('./Cliente')
const ClaseEnVivo = require('../modelo/EnVivo')

module.exports = {
    enVivo: (rootValue) => {
        const EnVivo = Cliente.getApi(rootValue).then((data) => {
            const ui = rootValue.ui;
            const datos = ClaseEnVivo.programas(data, ui);
            return datos
        });
        return EnVivo;
    }

};