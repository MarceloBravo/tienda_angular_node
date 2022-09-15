import { DataTypes, useInflection } from 'sequelize'
import { sequelize } from '../db/database.js'
import { RolModel } from './RolModel.js';
import { encriptarPassword } from '../shared/functions.js'

export const UsuarioModel = sequelize.define('usuarios', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true        
    },
    rut: {
        type: DataTypes.STRING(13),
        allowNull: false,
        unique: true
    },
    nombres: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    apellido1: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    apellido2: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    avatar: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    direccion: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    fono: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true
    }
},{
    timestamps: true,
    hooks: {
        beforeCreate: async (user, options) => {
            user.password = await encriptarPassword(user.password);
        },
        beforeUpdate: async (user, options) => {
            if(user.dataValues.password !== user._previousDataValues.password){
                user.password = await encriptarPassword(user.password);
            }
        },
    }
});

//RELACIONES ROLES-USUARIO

//Tiene muchos
RolModel.hasMany(UsuarioModel, {
    foreignKey: 'rolId',
    sourceKey: 'id'
});

//Pertenece a...
RolModel.belongsTo(RolModel, {
    foreignKey: 'id',
    targetId: 'id'
});
