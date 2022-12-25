import { UsuarioModel } from '../models/UsuarioModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as constantes  from '../shared/constants.js';
import { RolModel } from '../models/RolModel.js';
import os from 'os';

const networkInterfaces = os.networkInterfaces();
const address = networkInterfaces[Object.keys(networkInterfaces)[0]][1].address

export const login = async (req, res) => {    
    
    try{
        const { email, password, host } = req.body;
        const user = await UsuarioModel.findOne({where: {email}});
        if(user){

            const rol = await RolModel.findByPk(user.rolId);    
            bcrypt.compare(password.toString(), user.password.toString(), async (err, result)=>{
                if(err || !result){
                    res.status(err ? 500 : 401).json({mensaje: err ? 'Ocurrió un error al identificar el usuario.' : 'Usuario o contraseña incorrectos. Intentalo nuevamente'});
                }else{
                    user.dataValues.rol = rol ? rol.dataValues : {};

                    //Preparando el token a devolver
                    user.password = null;
                    const access_token = jwt.sign({user, address}, constantes.secret, {issuer: host, expiresIn: constantes.expiresTimeToken});    //Agregar datos al token: https://www.npmjs.com/package/jsonwebtoken
                    const refresh_token = jwt.sign({user, address}, constantes.secretRefresh, {issuer: host, expiresIn: constantes.expiresTimeRefreshToken});    //Token de refresco dura 5:30 hrs, media hora más que el token
                    
                    //console.log('TOKEN === ', access_token, 'REFRESH TOKEN === ', refresh_token)
                    res.json({access_token, refresh_token});                
                }
            });
            
            
        }else{
            res.status(404).json({mensaje: 'El usuario no existe.'});
        }

    }catch(e){
        res.status(500).json({mensaje: 'Ocurrió un error al intentar loguearse a la aplicación: ' + e.message});
    }
}


export const logout = async (req, res) => {
    res.json({mensaje: 'La sesión ha sido finalizada correctamente.'});
}



export const refreshToken = async (req, res) => {
    try{
        const { refreshToken, host } = req.body;
        
        const verify = jwt.verify(refreshToken, constantes.secretRefresh);

        if(!verify.user.id){
            throw 'El usuario no pudo ser reautentificado.';
        }
        
        const userVerify = verify.user;
        const user = await UsuarioModel.findByPk(userVerify.id);
        if(!user){
            throw 'Usuario no encontrado o inexistente. Logueate nuevamente...';
        }
        user.password = null;

        const rol = await RolModel.findByPk(user.rolId);

        const access_token = jwt.sign({user, rol}, constantes.secret, {issuer: host, expiresIn: constantes.expiresTimeToken});    //Agregar datos al token: https://www.npmjs.com/package/jsonwebtoken
        const refresh_token = jwt.sign({user, rol}, constantes.secretRefresh, {issuer: host, expiresIn: constantes.expiresTimeRefreshToken});    //Token de refresco dura 5:30 hrs, media hora más que el token
        
        res.json({access_token, refresh_token});
    }catch(e){
        //console.log('ERROR = ',e);
        res.status(500).json({mensaje: 'Ocurrió un error al volver a autenticar al usuario: ' + e.message});
    }
    
}