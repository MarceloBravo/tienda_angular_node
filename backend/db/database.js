import Sequelize from 'sequelize'

const HOST = 'localhost'
const HOST_TEST = 'localhost'
const PORT = '5433' 
const PORT_TEST = '5433'
const DB = 'tienda_angular_node'
const DB_TEST = 'tienda_angular_node_test'
const pwd = 'mabc'

export const sequelize = new Sequelize(process.env.NODE_ENV === 'test' ? DB_TEST : DB,'postgres',pwd,{
    host: process.env.NODE_ENV === 'test' ? HOST_TEST : HOST,
    port: process.env.NODE_ENV === 'text' ? PORT_TEST : PORT,
    dialect: 'postgres'
})
