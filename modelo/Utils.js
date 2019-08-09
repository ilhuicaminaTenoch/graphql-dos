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
}

module.exports = Utils