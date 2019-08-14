'use strick'

const Utils = require('./Utils')
const dateFormat = require('dateformat');
const requestPromise = require('request-promise')
const Url = require('url-parse')

class TipoElemento {
    static show(nota, ui) {
        let host = Utils.domain(ui)
        let options = {
            uri: `https://${host}/redux${nota['uri']}`
        }
        const requestShow = this.dataBroadCastEventShow(options)
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
            channel_name: '',
            override_url: '',
            stream_state: '',
            type: 'live'

        }
    }

    static clip(nota, ui, datosHub) {
        return datosHub.then((data) => {
            const idVideo = (nota.hasOwnProperty('player')) ? nota['player']['videoId'] : 0
            const m3u8Hub = data.find( mcp => mcp.mcpProviderId === idVideo)
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

    static dataBroadCastEventShow(options) {
        const apiRequest = requestPromise(options).then((data) => {
            const datosIframe = JSON.parse(data);
            if (datosIframe['content'][0]['_type'] === 'RichText') {
                let content = datosIframe['content'][0]['content'][0]
                const urlIframe = Utils.getSrc(content)
                let parserUrl = Url(urlIframe, true)
                let urlBroadcasteventPage = parserUrl.set('hostname', 'www.tudn.mx/redux')

                console.log(urlBroadcasteventPage.href)


            }
            /*if (datosIframe['content']['_type'] === 'RichText'){

            }*/


        });

    }




}

module.exports = TipoElemento