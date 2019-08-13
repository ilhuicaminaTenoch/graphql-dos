'use strick'



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
}

module.exports = Utils