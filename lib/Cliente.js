'use strict'

const requestPromise = require('request-promise')
const Utils = require('./../modelo/Utils')
class Cliente {
    static getApi(rootValue) {
        const domain = Utils.domain(rootValue.ui)
        const options = {
            url :`https://${domain}/redux${rootValue.pagina}`
        }
        const PETICION = requestPromise(options).then((datos) => {
            const newData = JSON.parse(datos)
            const contenido = newData.content
            const resultado = contenido.find( item => item.uid === rootValue.uid )
            return resultado;
        })
        return PETICION;
    }


}

module.exports = Cliente