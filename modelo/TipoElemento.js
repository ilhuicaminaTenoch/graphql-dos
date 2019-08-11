'use strick'

class TipoElemento {
    static show(elemento){
        const nuevoArreglo = []
        elemento.items.forEach(function(valor,index) {
            const arreglo = {
                id: valor['uid'],
                name: valor['title'],
                description: valor['description'],
                pub_date: valor['publishDate'],
                start_time: '',
                imagen: Utils.imagen(valor),

            }
            nuevoArreglo.push(arreglo)
        })

        return nuevoArreglo
    }


}
module.exports = TipoElemento