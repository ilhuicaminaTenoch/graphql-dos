'use strick'

const Utils = require('./Utils')
const dateFormat = require('dateformat');
const requestPromise = require('request-promise')
const Url = require('url-parse')

class TipoElemento {
    static show(nota, ui, epSenales) {
        let host = Utils.domain(ui)
        return this.dataBroadCastEventShow(host, nota['uri']).then((signals) => {
            epSenales.then((epg) => {
                console.log(epg[0]['idCanal'])
            })
            return {
                id: nota['uid'],
                name: nota['title'],
                description: nota['description'],
                pub_date: dateFormat(nota['publishDate'], "yyyy-mm-dd HH:MM:ss"),
                start_time: '',
                end_time: '',
                is_live: true,
                image_assets: [{
                    image_base: Utils.imagen(nota)
                }],
                show_category_external_id: nota['uid'],
                channel_id: '',
                channel_name: signals[0]['name'],
                override_url: signals[0]['signal'],
                stream_state: '',
                url_public: nota['canonicalUri'],
                type: 'live'
            }
        })
    }

    static clip(nota, ui, datosHub) {
        return datosHub.then((data) => {
            const idVideo = (nota.hasOwnProperty('player')) ? nota['player']['videoId'] : 0
            const m3u8Hub = data.find(mcp => mcp.mcpProviderId === idVideo)
            const urlVideo = Utils.cambiaToken(m3u8Hub['renditionUrl'])
            return {
                id: nota['uid'],
                name: nota['title'],
                description: nota['description'],
                pub_date: dateFormat(nota['publishDate'], "yyyy-mm-dd HH:MM:ss"),
                start_time: '',
                end_time: '',
                is_live: false,
                image_assets: [{
                    image_base: Utils.imagen(nota)
                }],
                show_category_external_id: nota['uid'],
                channel_id: '',
                channel_name: '',
                override_url: urlVideo,
                stream_state: '',
                url_public: nota['canonicalUri'],
                type: 'video'

            }
        })
    }

    static dataBroadCastEventShow(host, uri) {
        let optionsIframe = {uri: `https://${host}/redux${uri}`}
        let signals = []
        const peticionUno = requestPromise(optionsIframe).then((data) => {
            const datosIframe = JSON.parse(data);
            if (datosIframe['content'][0]['_type'] === 'RichText') {
                let content = datosIframe['content'][0]['content'][0]
                let urlIframe = Utils.getSrc(content)
                let formaUrlBroadcasEventShow = Utils.formaUrlBroadcasEventShow(urlIframe)
                let optionsBroadcasEventShow = {uri: `https://${host}/redux/${formaUrlBroadcasEventShow}`}
                const peticionDos = requestPromise(optionsBroadcasEventShow).then((dataBroadcastEventShow) => {
                    let jsonParser = JSON.parse(dataBroadcastEventShow)
                    let objeto = {
                        signal: jsonParser['signals'][0]['signal'],
                        name: jsonParser['signals'][0]['name']
                    }
                    signals.push(objeto)
                    return signals
                })
                return peticionDos
            }
        });
        return peticionUno

    }


}

module.exports = TipoElemento