import { DataTypes } from 'sequelize'
import { sequelize } from '../db/database.js'

export const MenuModel = sequelize.define('menus', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    icono: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    menuPadreId: {
        type: DataTypes.INTEGER,
        allowNull: true        
    },
    link: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    posicion: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true
    }
},{ 
    tymestamps: true
});

MenuModel.hasMany(MenuModel, {
    as: 'subMenus',
    foreignKey: 'menuPadreId',
    required: false
});

MenuModel.belongsTo(MenuModel, {
    as: 'menuPadre',
    foreignKey: 'menuPadreId',
    required: false
});