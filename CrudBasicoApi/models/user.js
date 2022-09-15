
const { Schema, model } = require('mongoose');


const UsersSchema = Schema({
    nombre: {
        type: String,
    },
    edad: {
        type: Number
    },
    nacimiento: {
        type: Date,
    },
    inscripcion: {
        type: Date,
    },
    costo: {
        type: Number,
        default: 0
    }
});


module.exports = model('Users', UsersSchema)
