import { RolModel } from "../models/RolModel.js"
import { dateToStringDMY } from '../shared/functions.js'
import Sequelize from "sequelize";
import { sequelize } from '../db/database.js';
import { regPerPage } from '../shared/constants.js'
const Op = Sequelize.Op;
const rowsPerPage = regPerPage;

export const getRoles = async (req,res) => {
    try{
        const  { pag } = req.params;
        const desde = (pag - 1) * rowsPerPage;
        const { count ,rows } = await RolModel.findAndCountAll({
            where: { deletedAt: null},
            offset: desde,
            limit: rowsPerPage,
            order: [['nombre', 'ASC']]
        });

        res.json({rows, count, rowsPerPage, pag});
    }catch(e){
        res.status(500).json({error: 'Ocurrió un error al intentar obtener el listado de roles: ' + e.message});
    }
}

export const getRolesFilter = async (req,res) => {
    try{
        const { texto, pag } = req.params;
        const desde = (pag - 1) * rowsPerPage;
        const { count, rows } = await RolModel.findAndCountAll({
            attributes: [
                "id",
                "nombre",
                "createdAt",
                "updatedAt",
            ],
            where: {
                [Op.and]:
                    {deletedAt: null},
                    [Op.or]: [
                        //{nombre: {[Op.like]: `%${texto}%`}},
                        sequelize.where(sequelize.fn('lower', sequelize.col('nombre')), 'like',`%${texto.toLowerCase()}%`),
                        sequelize.where(sequelize.fn('to_char', sequelize.col('createdAt'), 'dd-mm-yyyy'), 'like', `%${texto}%`),
                        sequelize.where(sequelize.fn('to_char', sequelize.col('updatedAt'), 'dd-mm-yyyy'), 'like', `%${texto}%`)
                    ]
            },
            offset: desde,
            limit: rowsPerPage,
            order: [['nombre','ASC']]
        });

        res.json({rows, count, rowsPerPage, pag});
    }catch(e){
        res.status(500).json({error: 'Ocurrió un error al aplicar el filtro al listado de roles: ' + e.message});
    }
}

export const getRolesAll = async (req, res) => {
    try{
        console.log(res);
        const { rows, count } = await RolModel.findAndCountAll({
            where: {deletedAt: null},
            order: [['nombre','ASC']]
        });

        res.json({rows, count, rowsPerPage});
    }catch(e){
        res.status(500).json({error: 'Ocurrió un error al obtener el listados de los roles: ' + e.message})
    }
}

export const getRolesId = async (req,res) => {
    try{
        const { id } = req.params;
        const data = await RolModel.findByPk(id);
        
        res.json((data && data.deletedAt === null) ? data: null);
    }catch(e){
        res.status(500).json({error: 'Ocurrió un error al buscar el rol: ' + e.message});
    }
}

export const postRoles = async (req,res) => {
    try{
        const { nombre } = req.body;
        const data = await RolModel.create({nombre});

        res.json({mensaje: 'El rol a sido creado exitosamente.', data});

    }catch(e){
        res.status(500).json({mensaje: 'Ocurrió un error al ingresar el rol: ' + e.message, data: e});
    }
}

export const putRoles = async (req, res) => {
    try{
        const { id } = req.params;
        const { nombre } = req.body;
        const [ rol, created ] = await RolModel.findOrCreate({where: {id}});
        rol.nombre = nombre;
        rol.updatedAt = dateToStringDMY(new Date());
        rol.deletedAt = null;
        await rol.save();

        res.json({mensaje: `El rol ha sido ${created ? 'creado' : 'actualizado'} exitosamente.`, data: rol});
    }catch(e){
        console.log(e);
        res.status(500).json({mensaje: 'Ocurrió un error al actualizar el rol: ' + e.message, data: e});
    }
}

export const deleteRoles = async (req,res) => {
    try{
        const { id } = req.params;
        const result = await RolModel.destroy({where: {id}});
        
        res.json({mensaje: result ? 'El rol ha sido eliminado exitosamente.' : 'Imposible eliminar el registro: el rol no existe o no fue encontrado', id})
    }catch(e){
        res.status(500).json({mensaje: 'Ocurrió un error al intentar eliminar el rol: ' + e.message, data: e});
    }
}

export const softDeleteRoles = async (req,res) => {
    try{
        const { id } = req.params;
        const rol = await RolModel.findByPk(id);
        if(!rol || rol.deletedAt !== null){
            res.json({mensaje: 'Imposible borrar el registro: el rol no existe o no fue encontrado.', data:id});
        }

        rol.deletedAt = dateToStringDMY(new Date());
        await rol.save();

        res.json({mensaje: 'El rol ha sido borrado exitosamente.', data:id});
    }catch(e){
        res.status(500).json({mensaje: 'Ocurrió un error al intentar borrar el resgistro: ' + e.message, data: e});
    }
}