'use strict'

const courses =[
    {
        _id: 'anyid',
        title: 'Mi titulo',
        teacher: 'Mi profesor',
        descripcion: 'una descripcion',
        topic: 'programacion'
    },
    {
        _id: 'anyid',
        title: 'Mi titulo 2',
        teacher: 'Mi profesor 2',
        descripcion: 'una descripcion 2',
        topic: 'programacion'
    },
    {
        _id: 'anyid',
        title: 'Mi titulo3',
        teacher: 'Mi profesor',
        descripcion: 'una descripcion',
        topic: 'programacion'
    },
]

module.exports = {
    getCourse: () => {
      return courses
    }
}