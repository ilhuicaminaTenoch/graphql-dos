'use strict'

/*const coneectDb = require('./db');
const {ObjectID} =  require('mongodb')*/
const Cliente = require('./Cliente')
const ClaseEnVivo = require('../modelo/EnVivo')

module.exports = {
    getEnVivo: (rootValue) => {
        const EnVivo = Cliente.getApi(rootValue).
        then((data) => {
            const datos = ClaseEnVivo.items(data)
            
            return datos
            
            /*
            const videosMcp = EnVivo.videosMcp(newData)
            const datosHub = EnVivo.consultaHub(videosMcp)
            const programas = EnVivo.programas(data,datosHub)
            console.log(programas);*/
        })

        return EnVivo
    }
    /*getCourses: async() => {
      let db, cursos = []
      try {
          // await es una funcion asincrona
          db = await coneectDb() 
          cursos = await db.collection('cursos').find().toArray() 
      } catch (error) {
          console.error(error);
      }
      return cursos;
    },

    getCourse: async(root, id) => {
        let db, curso = []
        try {
            // await es una funcion asincrona
            db = await coneectDb() 
            curso = await db.collection('cursos').findOne({ _id: ObjectID(id) })
        } catch (error) {
            console.error(error);
        }
        return curso;
    }*/
}