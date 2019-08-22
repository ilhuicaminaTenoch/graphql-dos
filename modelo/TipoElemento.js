'use strick'

const Utils = require('./Utils')
const dateFormat = require('dateformat');

class TipoElemento {
    static show(nota, ui, epSenales) {
        if(nota.hasOwnProperty('uri')) {
            let host = Utils.domain(ui)
            return Utils.dataBroadCastEventShow(host, nota['uri']).then((signals) => {
                return epSenales.then((epg) => {
                    const llave = epg.find(senal => senal.url === signals[0]['signal'])
                    return {
                        id: nota['uid'],
                        name: nota['title'],
                        description: nota['description'],
                        pub_date: dateFormat(nota['publishDate'], "yyyy-mm-dd HH:MM:ss"),
                        start_time: Utils.transformDate(signals[0]['startDate']),
                        end_time: Utils.transformDate(signals[0]['endDate']),
                        is_live: true,
                        image_assets: [{
                            image_base: Utils.imagen(nota)
                        }],
                        show_category_external_id: nota['uid'],
                        channel_id: llave.idCanal,
                        channel_name: signals[0]['name'],
                        override_url: signals[0]['signal'],
                        stream_state: signals[0]['playerState'],
                        url_public: nota['canonicalUri'],
                        type: 'live',
                        promoType: nota['promoType'],
                    }
                })
            })
        }else{
            Utils.creaLog(
                'created-logfile',
                'No existe el nodo uri',
                {uid:nota['uid'], title:nota['title']})
        }
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
                type: 'video',
                promoType: nota['promoType'],

            }
        })
    }
    static broadcastEvent(nota, ui, epSenales){
        let host = Utils.domain(ui)
        return Utils.dataBroadcastEvent(host, nota['uri']).then((dataBroadcastEvent) => {
            return  epSenales.then((epg) => {
                const llave = epg.find(senal => senal.url === dataBroadcastEvent[0]['signal'])
                return {
                    id: nota['uid'],
                    name: nota['title'],
                    description: nota['description'],
                    pub_date: dateFormat(nota['publishDate'], "yyyy-mm-dd HH:MM:ss"),
                    start_time: Utils.transformDate(dataBroadcastEvent[0]['startDate']),
                    end_time: Utils.transformDate(dataBroadcastEvent[0]['endDate']),
                    is_live: true,
                    image_assets: [{
                        image_base: dataBroadcastEvent[0]['imagen']
                    }],
                    show_category_external_id: nota['uid'],
                    channel_id: llave.idCanal,
                    channel_name: dataBroadcastEvent[0]['name'],
                    override_url: dataBroadcastEvent[0]['signal'],
                    stream_state: dataBroadcastEvent[0]['playerState'],
                    url_public: nota['canonicalUri'],
                    type: 'live',
                    promoType: nota['promoType'],
                }
            })
        })

    }
    static liveBlog(nota, ui, epSenales){
        let host = Utils.domain(ui)
        return Utils.dataBroadcastEventLiveBlog(host, ui, nota['title']).then((dataLiveBlog) => {
            console.log(dataLiveBlog)
        })
    }



}

module.exports = TipoElemento