'use strick'

const requestPromise = require('request-promise')
const Utils = require('./Utils')
class EnVivo {
    static videosMcp(datosComponente) {
        const arrayVideos = [];
        datosComponente.items.forEach(function (valor, index) {
            if (valor['promoType'] == 'clip' || valor['promoType'] == 'episode') {
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
        datosComponente.items.forEach(function (valor, index) {
            switch (valor['promoType']) {
                case 'clip':
                    programas.push(TypeElements.clips(valor, datosHub));
                    break;

            }
        });
        return programas;
    }

    static items(datos){
        const nuevoArreglo = []
        datos.items.forEach(function(valor,index) {
            const imagen = Utils.imagen(valor)
            const arreglo = {
                title: valor['title'],
                description: valor['description'],
                canonicalUri: valor['canonicalUri'],
                // duration: valor['duration'],
                // imagen: imagen
            }
            nuevoArreglo.push(arreglo)
        })

        return nuevoArreglo
    }
}
module.exports = EnVivo