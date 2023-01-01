import { MenuModel } from "../models/MenuModel.js"
import { dateToStringYMD } from '../shared/functions.js'
import Sequelize, { json } from "sequelize";
import { sequelize } from '../db/database.js';
import { regPerPage, slashReplace } from '../shared/constants.js'
const Op = Sequelize.Op;
const rowsPerPage = regPerPage;

export const getChildrenMenus = async (req, res) => {
    try{
        const { menuPadreId } = req.params;
        const { count, rows } = await MenuModel.findAndCountAll({
            /*
            include: [{
                model: MenuModel, 
                attributes: ['id','nombre', 'posicion', 'link','icono','createdAt', 'updatedAt','deletedAt'],
                as: 'subMenus'
            }],
            */
            where: {
                [Op.and]:
                    {deletedAt: null},
                [Op.or]: [
                    {menuPadreId: menuPadreId.toLowerCase() === 'null' ? null : parseInt(menuPadreId)}
                ],
            },
            order: [['posicion','ASC']]
        });
        
        let menu = JSON.parse(JSON.stringify(rows));
        for(const mnu of menu){
            let e = await getSubMenu(mnu.id);
            mnu.submenu = JSON.parse(JSON.stringify(e));
        };
        
        //console.log('Menu Final = ', JSON.stringify(menu));

        res.json({rows: menu, count});
    }catch(e){
        res.status(500).json({error: 'Ocurrió un error al intentar obtener los menús: '+e.message, rows: [], count: 0});
    }
}


const getSubMenu = async (menuPadreId) => {
    const { count, rows } = await MenuModel.findAndCountAll({
        where: {
            [Op.and]:
                {deletedAt: null},
            [Op.or]: [
                {menuPadreId: menuPadreId}
            ],
        },
        order: [['posicion','ASC']]
    });

    let objMenus = JSON.parse(JSON.stringify(rows));
    for(const mnu of objMenus){
        objMenus.submenu = JSON.parse(JSON.stringify(await getSubMenu(mnu.id)));
    };
    return objMenus;
} 


export const getMenus = async (req, res) => {
    try{
        const { pag, rows } =  req.params;
        const regPorPagina  = rows ? parseInt(rows) : rowsPerPage;
        const desde = regPorPagina * (pag - 1);
        const res1 = await MenuModel.findAndCountAll({
            include: [{
                model: MenuModel, 
                attributes: ['id','nombre','posicion', 'createdAt', 'updatedAt'],
                as: 'menuPadre'
            }],
            where: {deletedAt: null},
            offset: desde,
            limit: regPorPagina, 
            order: [['menuPadreId', 'ASC'],['nombre', 'ASC']]
        });

         const res2 = await MenuModel.findAndCountAll({where: {deletedAt: null}});
         
        res.json({data: res1.rows, totalRegistros: res2.count, regPorPagina: regPorPagina, pagina: parseInt(pag), totalPaginas: Math.ceil(res2.count / regPorPagina) });
    }catch(e){
        res.status(500).json({error: 'Ocurrió un error al intentar obtener el listado de Menús: '+e.message});
    }
}

export const getMenusFilter = async (req, res) => {
    try{
        const { pag, rows, texto } = req.params;
        const regPorPagina  = rows ? parseInt(rows) : rowsPerPage;
        const textoBuscado = texto.split(slashReplace).join('-');
        const desde = regPorPagina * (pag - 1);
        const where =  {where: { 
            [Op.and]: 
                {deletedAt: null},
                [Op.or]: [
                    sequelize.where(sequelize.fn('lower', sequelize.col('nombre')), 'like',`%${textoBuscado.toLowerCase()}%`),
                    sequelize.where(sequelize.fn('lower', sequelize.col('link')), 'like',`%${textoBuscado.toLowerCase()}%`),
                    sequelize.where(sequelize.fn('text', sequelize.col('posicion')), 'like',`%${textoBuscado}%`),
                    sequelize.where(sequelize.fn('to_char', sequelize.col('createdAt'), 'dd-mm-yyyy'), 'like',`%${textoBuscado.toLowerCase()}%`),
                    sequelize.where(sequelize.fn('to_char', sequelize.col('updatedAt'), 'dd-mm-yyyy'), 'like',`%${textoBuscado.toLowerCase()}%`)
                ]
        }}
        const res1 = await MenuModel.findAndCountAll({
            where,
            offset: desde,
            limit: regPorPagina,
            order: [['nombre','ASC']]
        });

        const res2 = await MenuModel.findAndCountAll({where});
         
        res.json({data: res1.rows, totalRegistros: res2.count, regPorPagina: regPorPagina, pagina: parseInt(pag), totalPaginas: Math.ceil(res2.count / regPorPagina) });
    }catch(e){
        res.status(500).json({error: 'Ocurrio un error al intentar aplicar el filtro al listado de menús: '+e.message});
    }
}

export const getMenusAll = async (req, res) => {
    try{
        const { count, rows } = await MenuModel.findAndCountAll({
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
        const data = await MenuModel.findByPk(id);

        res.json((data && data.deletedAt === null) ? data : null);
    }catch(e){
        res.status(500).json({error: 'Ocurrio un error al buscar el menú: '+e.message, data: null});
    }
}

export const postMenus = async (req, res) => {
    try{
        const { nombre, menuPadreId } = req.body;
        const data = await MenuModel.create({nombre, menuPadreId});

        res.json({mensaje: 'El registro ha sido creado exitosamente.', data});
    }catch(e){
        res.status(500).json({error: 'Ocurrio un error al intentar crear el menú: '+e.message, data: e});
    }
}

export const putMenus = async (req, res) => {
    try{
        const { id } = req.params;
        const { nombre, menuPadreId, icono, posicion, link } = req.body;
        const [ menu, created ] = await MenuModel.findOrCreate({ where: {id}});

        let isNuevo = menu.deletedAt === null ? created: true;
        menu.nombre = nombre;
        menu.menuPadreId = menuPadreId;
        menu.posicion = posicion;
        menu.icono = icono;
        menu.link = link;
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
        const result = await MenuModel.destroy({where: {id}});

        res.json({mensaje: result ? 'El registro ha sido eliminado exitosamente.' : 'Imposible eliminar el resgitro: el menú no existe o no fue encontrado.', data: id});
    }catch(e){
        res.status(500).json({error: 'Ocurrio un error al intentar eliminar el registro: '+e.message, data: e});
    }
}

export const softDeleteMenus = async (req, res) => {
    try{
        const { id } = req.params;
        const menu = await MenuModel.findByPk(id);
        if(menu === null){
            res.status(404).json({mensaje: 'Imposible borrar el registro: el menú no fue encontrado o no existe.', data: id});
        }else{
            menu.deletedAt = dateToStringYMD(new Date());
            await menu.save();

            res.json({mensaje: 'El registro ha sido borrado exitosamente.', data: id});
        }
    
    }catch(e){
        res.status(500).json({mensaje: 'Ocurrio un error al intentar borrar el registro: '+e.message, data: e});
    }
}