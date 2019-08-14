'use strick'

const Elemento = require('./TipoElemento')
const Utils = require('./Utils')
class EnVivo {
    static programas(datosComponente, ui) {
        const programas = [];
        const videosMcp = Utils.videosMcp(datosComponente)
        const consultaHub = Utils.consultaHub(videosMcp)
        const senales = Utils.epgSenales()
        datosComponente.items.forEach(function (nota, indice) {
            switch (nota['promoType']) {
                case 'show':
                    //programas.push(Elemento.show(nota, ui))
                    break;
                case 'clip':

                    programas.push(Elemento.clip(nota,ui, consultaHub))
                    break

            }
        })
        return programas;
    }


}
module.exports = EnVivo