'use strict'

/*const queries = require('./queries')
const mutations = require('./mutations')
module.exports = {
    Query: queries,
    Mutation: mutations
}*/

const coneectDb = require('./db');
const {ObjectID} =  require('mongodb')
module.exports= {
    Query: {
        getCourses: async () => {
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

        getCourse: async (root, id) => {
            let db, curso = []
            try {
                // await es una funcion asincrona
                db = await coneectDb()
                curso = await db.collection('cursos').findOne({_id: ObjectID(id)})
            } catch (error) {
                console.error(error);
            }
            return curso;
        }
    }
}