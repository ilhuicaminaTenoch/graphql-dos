'use strick'

const Utils = require('./Utils')
const dateFormat = require('dateformat');
const requestPromise = require('request-promise')
const Url = require('url-parse')

class TipoElemento {
    static show(nota, ui, epSenales) {
        let host = Utils.domain(ui)
        return this.dataBroadCastEventShow(host, nota['uri']).then((signals) => {
            //console.log(signals)
            return epSenales.then((epg) => {
                const llave = epg.find(senal => senal.url === signals[0]['signal'])
                const t = new Date()
                const fecha = signals[0]['startDate'].substring(0, 10)
                const hora = signals[0]['startDate'].substring(11,19)
                //const formatoFecha = dateFormat(',"yyyy/mm/dd HH:MM:ss")
                console.log(t)
                return {
                    id: nota['uid'],
                    name: nota['title'],
                    description: nota['description'],
                    pub_date: dateFormat(nota['publishDate'], "yyyy-mm-dd HH:MM:ss"),
                    start_time: signals[0]['startDate'],//dateFormat(signals[0]['startDate'], "yyyy/mm/dd HH:MM:ss"),
                    end_time: '',
                    is_live: true,
                    image_assets: [{
                        image_base: Utils.imagen(nota)
                    }],
                    show_category_external_id: nota['uid'],
                    channel_id: llave.idCanal,
                    channel_name: signals[0]['name'],
                    override_url: signals[0]['signal'],
                    stream_state: '',
                    url_public: nota['canonicalUri'],
                    type: 'live'
                }
            })
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
                        startDate: jsonParser['startDate'],
                        endDate: jsonParser['endDate'],
                        signal: jsonParser['signals'][0]['signal'],
                        name: jsonParser['signals'][0]['name'],
                        playerState: jsonParser['playerState']
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