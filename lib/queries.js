'use strict'

const connectDB = require('./db');
const {ObjectID} =  require('mongodb')


module.exports =  {
    getCourses: async () => {
        let db, cursos = []

        try {

            // await es una funcion asincrona
            db = await connectDB()
            cursos = await db.collection('cursos').find().toArray()
        } catch (error) {
            console.error(error);
        }
        return cursos;
    },

    getCourse: async (root, {id}) => {
        let db, curso = []
        try {
            // await es una funcion asincrona
            db = await connectDB()
            curso = await db.collection('cursos').findOne({_id: ObjectID(id)})
        } catch (error) {
            console.error(error);
        }
        return curso;
    }
}