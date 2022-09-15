import { DataTypes } from 'sequelize';
import { sequelize } from '../db/database.js';
//import { UsuarioModel } from './usuarioModel.js';
import { encriptarPassword } from '../shared/functions.js';

export const RolModel = sequelize.define('roles', {
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
    createdAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true
    }
},{
    tymestamps: true
});