import { secret } from './constants.js';
import jwt from 'jsonwebtoken';

export const checkToken = async (req, res, next) => {
    try{
        const bearerHeader = req.headers['authorization'];
        if(bearerHeader){
            let token = bearerHeader.split(" ")[1];
            req.token = token;
            let verified = jwt.verify(token, secret)
            if(verified){
                next();
            }else{
                res.sendStatus(403);
            }
        }else{
            res.status(403).send('Autorización no válida.');
        }
    }catch(error){ 
        console.log(error)
        res.status(401).send('Ocurrió un error al verificar tu identidad.');
    }
}