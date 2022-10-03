import { DataTypes, useInflection } from 'sequelize'
import { sequelize } from '../db/database.js'
import { RolModel } from './RolModel.js';
import { encriptarPassword } from '../shared/functions.js'


export const MenusModel = sequelize.define('menus', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    menuPadreId: {
        type: DataTypes.INTEGER,
        allowNull: true        
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true
    }
});