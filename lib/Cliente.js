'use strict'

const requestPromise = require('request-promise')
class Cliente {
    static getApi(rootValue) {
        const domain = this.domain(rootValue.ui)
        const options = {
            url :`https://${domain}/redux/${rootValue.pagina}`
        }
        const PETICION = requestPromise(options).then((datos) => {
            const newData = JSON.parse(datos)
            const contenido = newData.content
            const resultado = contenido.find( item => item.uid === rootValue.uid );
            return resultado;
        })
        return PETICION;
    }

    static domain(ui){
        let domainUi = 'www.tudn.mx'
        switch (ui) {
            case 'tudn':
                domainUi = 'www.tudn.mx'
            break;

            case 'las-estrellas': 
                domainUi = 'www.lasestrellas.tv'
        
            default: 
                domainUi
        }
        return domainUi
    }
}

module.exports = Cliente