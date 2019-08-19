'use strick'


const requestPromise = require('request-promise')
const parse = require('url-parse')
const dateFormat = require('dateformat')
class Utils {
    static imagen(nota){
        let imagen = ''
       //console.log(nota['media']['renditions']['aspect-16x9']['large']['uri'])
       if(nota.hasOwnProperty('media')){
           if(nota['media'].hasOwnProperty('renditions')){
               if(nota['media']['renditions'].hasOwnProperty('aspect-16x9')){
                    if(nota['media']['renditions']['aspect-16x9'].hasOwnProperty('large')){
                        imagen = nota['media']['renditions']['aspect-16x9']['large']['uri']
                
                    } 
               }
            
           }
           
       }
        return imagen
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
    static getSrc(string){
        let srcWithQuotes = string.match(/src\=([^\s]*)\s/)[1]
        let src = srcWithQuotes.substring(1,srcWithQuotes.length - 1)
        return src
    }
    static consultaHub(datosIdvideos) {
        if (datosIdvideos.length > 0) {
            const ids = encodeURI(datosIdvideos.join(','));
            const size = datosIdvideos.length;
            const options = {
                uri: 'http://video-hub-prod-tvss-1882082018.us-east-1.elb.amazonaws.com/api/v3/video-auth/url-signature-tokens?mcpids=' + ids + '&size=' + size
            };

            const API_REQUEST = requestPromise(options).then((data) => {
                const datosHub = JSON.parse(data)
                return datosHub['data'];
            });
            return API_REQUEST;
        }
    }
    static videosMcp(datosComponente) {
        const arrayVideos = [];
        datosComponente.items.forEach(function (valor, index) {
            if (valor['promoType'] === 'clip' || valor['promoType'] === 'episode') {
                if (valor.hasOwnProperty('player')){
                    arrayVideos.push(valor['player']['videoId']);
                }
            }
        });
        return arrayVideos;
    }
    static epgSenales(){
        const options = {
            uri: 'http://static-feeds.esmas.com/awsfeeds/sports/news/epgSenales.json'
        }
        const API_REQUEST = requestPromise(options).then((data) => {
            const senales = JSON.parse(data);
            return senales['datos'];
        });
        return API_REQUEST;
    }
    static cambiaToken(m3u8){
        let token = 'hdnea=exp=1568765697~acl=/*~hmac=e52538a535fda93143d02584936413cead0ba98c8fbfa04f0f6ccd3d52bb3035'
        let parserUrl = parse(m3u8, true)
        let nuevoToken = parserUrl.set('query', token)
        return nuevoToken.href
    }

    static formaUrlBroadcasEventShow(url){
        let parserUrl = parse(url, true)
        let hostname = parserUrl.set('hostname', '')
        let query = hostname.set('query','')
        let cadenaFinal = query.href
        let array = cadenaFinal.split('/')
        let lastsegment = array[array.length-1]
        return lastsegment
    }

    static transformDate(fechaCompleta){
        // ejemplo:2019:08:25T14:00:00Z
        const fecha = fechaCompleta.substring(0, 10)
        const hora = fechaCompleta.substring(11,19)
        let nuevaFecha = fecha.replace(/:/gi,'-')
        let dateformat = dateFormat(nuevaFecha+' '+hora, 'yyyy/mm/dd HH:MM:ss')
        return dateformat;

    }
}

module.exports = Utils