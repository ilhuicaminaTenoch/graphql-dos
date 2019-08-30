'use strict'
const Cliente = require('./Cliente')
const ClaseEnVivo = require('../modelo/EnVivo')

module.exports = {
    enVivo: (args) => {
        const EnVivo = Cliente.getApi(args).then((data) => {
            const ui = args.ui;
            const datos = ClaseEnVivo.programas(data, ui);
            return datos
        });
        return EnVivo;
    }

};