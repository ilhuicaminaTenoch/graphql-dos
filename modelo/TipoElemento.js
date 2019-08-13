'use strick'

const Utils = require('./Utils')
const dateFormat = require('dateformat');
const  requestPromise = require('request-promise')
class TipoElemento {
    static show(nota, ui){
        let host = Utils.domain(ui)
        let options = {
            uri: `https://${host}${nota['uri']}`
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

    static clip(nota, ui){
        let host = Utils.domain(ui)

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

    static dataBroadCastEventShow(options){
        const apiRequest = requestPromise(options).then((data) => {
            const parserData = JSON.parse(data)
            console.log(parserData)


        });

    }


}
module.exports = TipoElemento