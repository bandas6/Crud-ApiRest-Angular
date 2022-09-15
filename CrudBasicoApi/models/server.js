const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.Port;

        this.paths = {
            users:'/api/users'
        }

        //Data Base
        this.conectionDB();

        //Middlewares
        this.middlewares();

        //Rutas de mi application
        this.routes();

    }

    middlewares(){

        //Cors
        this.app.use(cors());

        //Parceo y lectura
        this.app.use(express.json())

        //Directorio publico
        this.app.use(express.static('public'))
    }

    async conectionDB(){
        await dbConnection()
    }

    routes(){
        this.app.use(this.paths.users,require('../routes/users'))
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Server online in port ${this.port}`)
        });
    }
}

module.exports = Server;