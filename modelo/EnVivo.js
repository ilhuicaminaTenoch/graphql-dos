'use strick'

const requestPromise = require('request-promise')
const Utils = require('./Utils')
const Elemento = require('./TipoElemento')
class EnVivo {
    static videosMcp(datosComponente) {
        const arrayVideos = [];
        datosComponente.items.forEach(function (valor, index) {
            if (valor['promoType'] === 'clip' || valor['promoType'] === 'episode') {
                const ids = {
                    id: valor['player']['videoId']
                }
                if (valor.hasOwnProperty('player')) arrayVideos.push(ids);
            }
        });
        return arrayVideos;
    }

    static consultaHub(datosIdvideos) {
        const ids = encodeURI(datosIdvideos.join(','));
        const size = datosIdvideos.length;
        const options = {
            uri: 'http://video-hub-prod-tvss-1882082018.us-east-1.elb.amazonaws.com/api/v3/video-auth/url-signature-tokens?mcpids=' + ids + '&size=' + size
        };

        const API_REQUEST = requestPromise(options).then((data) => {
            const datosHub = JSON.parse(data);
            return datosHub['data'];
        });
        return API_REQUEST;
    }

    static programas(datosComponente, datosHub) {
        const programas = [];
        datosComponente.items.forEach(function (nota, indice) {
            switch (nota['promoType']) {
                case 'show':
                    programas.push(Elemento.show());
                    break;

            }
        });
        return programas;
    }


}
module.exports = EnVivo