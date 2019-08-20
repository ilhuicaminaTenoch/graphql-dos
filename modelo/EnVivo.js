'use strick'

const Elemento = require('./TipoElemento')
const Utils = require('./Utils')
class EnVivo {
    static programas(datosComponente, ui) {
        const programas = [];
        const videosMcp = Utils.videosMcp(datosComponente)
        const consultaHub = Utils.consultaHub(videosMcp)
        const epgSenales = Utils.epgSenales()
        datosComponente.items.forEach(function (nota, indice) {
            switch (nota['promoType']) {
                case 'show':
                    programas.push(Elemento.show(nota, ui, epgSenales))
                    break;
                case 'clip':
                    programas.push(Elemento.clip(nota,ui, consultaHub))
                    break
                case 'BroadcastEvent':
                    programas.push(Elemento.broadcastEvent(nota, ui, epgSenales))
                    break

            }
        })
        return programas.filter(Boolean);
    }


}
module.exports = EnVivo