import { UsuarioModel } from "../models/UsuarioModel.js"
import { dateToStringYMD } from '../shared/functions.js'
import Sequelize from "sequelize";
import { sequelize } from '../db/database.js';
import { regPerPage } from '../shared/constants.js'
const Op = Sequelize.Op;
const rowsPerPage = regPerPage;
const orderBy = [["apellido1","ASC"],["apellido2","ASC"],["nombres", "ASC"]]

//Array con los atributos seleccionados a retornar por aquellas peticiones que devuelvan listados de usuarios
const selectedAttributes =  [
                                "id",
                                "rut",
                                "nombres",
                                "apellido1",
                                "apellido2",
                                "direccion",
                                "email",
                                "fono",
                                "createdAt",
                                "updatedAt"
                            ];


export const getUsuarios = async (req, res) => {
    try{
        const { pag } = req.params;
        const desde = (pag - 1) * rowsPerPage;
        const { count, rows } = await UsuarioModel.findAndCountAll({
            attributes: selectedAttributes,
            where: {deletedAt: null},
            offset: desde,
            limit: rowsPerPage,
            order: orderBy
        });

        res.json({rows, count, rowsPerPage, pag});
    }catch(e){
        res.status(500).json({error: 'Ocurrió un error al obtener el listado de usuarios: ' + e.message});
    }
}


export const getUsuariosFilter = async (req,res) => {
    try{
        const { texto, pag } = req.params;
        const desde = (pag - 1) *  rowsPerPage;
        const { count, rows } = await UsuarioModel.findAndCountAll({
            attributes: selectedAttributes,
            where: {
                [Op.and]: 
                    {deletedAt: null},
                    [Op.or]: [
                        {nombres: {[Op.like]: `%${texto}%`}},
                        {apellido1: {[Op.like]: `%${texto}%`}},
                        {apellido2: {[Op.like]: `%${texto}%`}},
                        {direccion: {[Op.like]: `%${texto}%`}},
                        {email: {[Op.like]: `%${texto}%`}},
                        sequelize.where(sequelize.fn('to_char', sequelize.col('createdAt'), 'dd-mm-yyyy'), 'like', `%${texto}%`),
                        sequelize.where(sequelize.fn('to_char', sequelize.col('updatedAt'), 'dd-mm-yyyy'), 'like', `%${texto}%`)
                    ]
                },
            offset: desde,
            limit: rowsPerPage,
            order: orderBy 
        });

        res.json({rows, count, rowsPerPage, pag});

    }catch(e){
        res.status(500).json({error: 'Ocurrió un error al filtrar el listado de usuarios: ' + e.message});
    }
}

export const getUsuariosAll = async (req, res) => {
    try{
        const rows = await UsuarioModel.findAll({
            where: {deletedAt: null},
            order: orderBy
        });

        res.json({rows});
    }catch(e){
        res.status(500).json({error: 'Ocurrió un error al obtener el listado de todos los usuarios: ' + e.message});
    }
}

export const getUsuariosId = async (req,res) => {
    try{
        const { id } = req.params;
        const data = await UsuarioModel.findByPk(id);

        res.json((data && data.deletedAt === null) ? data : null);
    }catch(e){
        res.status(500).json({error: 'Ocurrió un error al efectuar la busqueda del usuario: ' + e.message});
    }
}

export const postUsuarios = async (req, res) => {
    try{
        const errores = validaDatos(req.body);
        if((Object.keys(errores).length === 0)){
            const data = await UsuarioModel.create(req.body);

            res.json({mensaje: 'El usuario ha sido creado exitosamente.', data});
        }else{
            res.json({mensaje: 'Datos no válidos o incompletos: ', data: errores, error: true});
        }
        
    }catch(e){
        res.status(500).json({mensaje: 'Ocurrió un error al crear el usuario: ' + e.message, data: null});
    }
} 


export const putUsuarios = async (req, res) => {
    try{
        const { id } = req.params;
        const errores = validaDatos(req.body, true);
        if((Object.keys(errores).length === 0)){
            const { rut, nombres, apellido1, apellido2, direccion, avatar, fono, email, password, rolId} = req.body;
            const usuario = await UsuarioModel.findByPk(id);
            usuario.rut = rut;
            usuario.nombres = nombres;
            usuario.apellido1 = apellido1;
            if(apellido2)usuario.apellido2 = apellido2;
            usuario.direccion = direccion;
            if(avatar)usuario.avatar = avatar;
            usuario.fono = fono;
            usuario.email = email;
            usuario.rolId = rolId;
            if(password) usuario.password = password;
            usuario.deletedAt = null;

            await usuario.save();

            res.json({mensaje: 'El usuario ha sido actualizado exitosamente.', data: usuario});
        }else{
            res.status(500).json({mensaje: 'Datos no válidos o incompletos: ', data: errores});
        }
        
    }catch(e){
        res.status(500).json({mensaje: 'Ocurrió un error al crear el usuario: ' + e.message, data: e});
    }
} 

export const deleteUsuarios = async (req, res) => {
    try{
        const { id } = req.params;
        const result = await UsuarioModel.destroy({where: {id: id}});
        console.log(result ? 'OK': 'ERROR');

        res.json({mensaje: result ? 'El usuario ha sido eliminado exitosamente.' : 'Imposible eliminar: el usuario no fue encontrado o el registro es inexistente.', data: id});
    }catch(e){
        res.status(500).json({mensaje: 'Ocurrió un error al intentar eliminar el usuario: ' + e.message, data: e});
    }
}

export const softDeleteUsuarios = async (req, res) => {
    try{
        console.log('PARAMS',req.params);
        const { id } = req.params;
        const usuario = await UsuarioModel.findByPk(id);
        if(usuario && usuario.deletedAt === null){
            usuario.deletedAt = dateToStringYMD(new Date());
            await usuario.save();
            res.json({mensaje: 'El usuario ha sido borrado exitosamente.', data: id});
        }else{
            res.status(404).json({mensaje: 'Imposible borrar el usuario: El usuario no fue encontrado o el registro es inextistente.', data: id});
        }
        
    }catch(e){
        res.status(500).json({mensaje: 'Ocurrió un error al intentar borrar el usuario: ' + e.message,  data: e});
    }
}

const validaDatos = (data, isUpdate = false) => {
    const { rut, nombres, apellido1, apellido2, avatar, fono, email, password} = data;
    let resp = {};
    if(!rut){
        resp.rut = 'El rut es obligatorio.';
    }
    if(!nombres){
        resp.nombres = 'El nombre es obligatorio.';
    }
    if(!apellido1){
        resp.apellido1 = 'El primer apellido es obligatorio';
    }
    if(!fono){
        resp.fono = 'El teléfono es obligatorio.';
    }
    if(!email){
        resp.email = 'Debe ingresar un correo electrónico';
    }

    if(!isUpdate){
        if(!password){
            resp.password = 'La contraseña es obligatoria.';
        }
    }

    return resp;
}