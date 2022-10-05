import { MenusModel } from "../models/menusModel.js"
import { dateToStringYMD } from '../shared/functions.js'
import Sequelize, { json } from "sequelize";
import { sequelize } from '../db/database.js';
import { regPerPage } from '../shared/constants.js'
const Op = Sequelize.Op;
const rowsPerPage = regPerPage;

export const getMenus = async (req, res) => {
    try{
        const { pag } =  req.params;
        const desde = rowsPerPage * (pag - 1);
        const { count, rows } = await MenusModel.findAndCountAll({
            where: {deletedAt: null},
            offset: desde,
            limit: rowsPerPage, 
            order: [['nombre', 'ASC']]
        });

        res.json({rows, count, rowsPerPage, pag});
    }catch(e){
        res.status(500).json({error: 'Ocurrió un error al intentar obtener el listado de Menús: '+e.message});
    }
}

export const getMenusFilter = async (req, res) => {
    try{
        const { pag, texto } = req.params;
        const desde = rowsPerPage * (pag - 1);
        const { count, rows } = await MenusModel.findAndCountAll({
            where: { 
                [Op.and]: 
                    {deletedAt: null},
                    [Op.or]: [
                        sequelize.where(sequelize.fn('lower', sequelize.col('nombre')), 'like',`%${texto.toLowerCase()}%`),
                        sequelize.where(sequelize.fn('to_char', sequelize.col('createdAt'), 'dd-mm-yyy'), 'like',`%${texto.toLowerCase()}%`),
                        sequelize.where(sequelize.fn('to_char', sequelize.col('updatedAt'), 'dd-mm-yyy'), 'like',`%${texto.toLowerCase()}%`)
                    ]
            },
            offset: desde,
            limit: rowsPerPage,
            order: [['nombre','ASC']]
        });

        res.json({rows, count, rowsPerPage, pag});
    }catch(e){
        res.status(500).json({error: 'Ocurrio un error al intentar aplicar el filtro al listado de menús: '+e.message});
    }
}

export const getMenusAll = async (req, res) => {
    try{
        const { count, rows } = await MenusModel.findAndCountAll({
            where: {deletedAt: null},
            order: [['nombre','ASC']]
        });

        res.json({rows, count});
    }catch(e){
        res.status(500).json({error: 'Ocurrio un error al obtener el listado de menús: '+e.message});
    }
}

export const getMenusId = async (req, res) => {
    try{
        const { id } = req.params;
        const data = await MenusModel.findByPk(id);

        res.json((data && data.deletedAt === null) ? data : null);
    }catch(e){
        res.status(500).json({error: 'Ocurrio un error al buscar el menú: '+e.message, data: null});
    }
}

export const postMenus = async (req, res) => {
    try{
        const { nombre, menuPadreId } = req.body;
        const data = await MenusModel.create({nombre, menuPadreId});

        res.json({mensaje: 'El registro ha sido creado exitosamente.', data});
    }catch(e){
        res.status(500).json({error: 'Ocurrio un error al intentar crear el menú: '+e.message, data: e});
    }
}

export const putMenus = async (req, res) => {
    try{
        const { id } = req.params;
        const { nombre, menuPadreId } = req.body;
        const [ menu, created ] = await MenusModel.findOrCreate({ where: {id}});
        console.log('createdAt = ',menu.createdAt, 'CREATED = ', created )
        let isNuevo = menu.deletedAt === null ? created: true;
        console.log('isNuevo = ', isNuevo);
        menu.nombre = nombre;
        menu.menuPadreId = menuPadreId;
        menu.updatedAt = dateToStringYMD(new Date());
        menu.deletedAt = null;
        await menu.save();

        res.json({mensaje: `El menú ha sido ${isNuevo ? 'creado' : 'actualizado'} exitosamente.`, data: menu});
    }catch(e){
        res.status(500).json({error: 'Ocurrio un error al intentar actualizar el registro: '+e.message, data: e});
    }
}

export const deleteMenus = async (req, res) => {
    try{
        const { id } = req.params;
        const result = await MenusModel.destroy({where: {id}});

        res.json({mensaje: result ? 'El registro ha sido eliminadio exitosamente.' : 'Imposible eliminar el resgitro: el menú no existe o no fue encontrado.', id});
    }catch(e){
        res.status(500).json({error: 'Ocurrio un error al intentar eliminar el registro: '+e.message, data: e});
    }
}

export const softDeleteMenus = async (req, res) => {
    try{
        const { id } = req.params;
        const menu = await MenusModel.findByPk(id);
        if(menu === null){
            res.status(404).json({mensaje: 'Imposible borrar el registro: el menú no fue encontrado o no existe.', id});
        }else{
            menu.deletedAt = dateToStringYMD(new Date());
            await menu.save();

            res.json({mensaje: 'El registro ha sido borrado exitosamente.', id});
        }
    
    }catch(e){
        res.status(500).json({mensaje: 'Ocurrio un error al intentar borrar el registro: '+e.message, data: e});
    }
}