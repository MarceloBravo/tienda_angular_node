//Para utilizar import se debe agregar la línea  `"type" : "module"`en el archivo package.json (al utilizar import no se puede utilizar require ya que ahora el archivo json se comporta como un módulo)
import cors  from 'cors';   //Evitar el error de CORS: https://www.techiediaries.com/fix-cors-with-angular-cli-proxy-configuration/
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import morgan from 'morgan';
import bodyParser from 'body-parser';  //Necesario para atender las peticiones post
import formidable from 'express-formidable';  //Necesario para atender las peticiones post

import rolesRoutes from '../routes/roles.routes.js';
import usuariosRoutes from '../routes/usuarios.routes.js';
import loginRoutes from '../routes/login.routes.js';
import menusRoutes from '../routes/menus.routes.js';
//import fileupload from 'express-fileupload';
import { sequelize } from '../db/database.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

export let server = null;
export default app;

app.use(cors());
app.use(express.static(path.join(__dirname,'../public'))); 

//app.use(fileupload());

//const { resolve } = require('path');

app.set('host', '192.168.1.151');
app.set('port', process.env.PORT || 3001);

//middlewares
app.use(morgan('dev')); //Utiliza morgan en modo de develop para mostrar los mensajes por consola
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(formidable());
app.use(bodyParser.json()); //Permite recibir y entender los datos recibidos como objeto JSON

app.use(rolesRoutes);
app.use(usuariosRoutes);
app.use(loginRoutes);
app.use(menusRoutes);

import '../models/RolModel.js';
import '../models/UsuarioModel.js';
import '../models/MenuModel.js';

//let server = null
async function main(){
    try{
        //await sequelize.sync({alter: true});
        console.log('Conexión establecida con la base de datos...');
        //app.listen(app.get('port'), '0.0.0.0',() => { //heroku
        if (process.env.NODE_ENV !== 'test') {  //En modo de prueba no se necesita estar escuchando a un puerto de red
            server = app.listen(app.get('port'), app.get('host'),() => {    
                console.log(`Servidor nodemon activo en ${app.get('host')}:${app.get('port')}`);
            });
        }
        
    }catch(e){  
        console.log('Ocurrió un error al conectar con la base de datos: ' + e.message);
    }
}

main();
