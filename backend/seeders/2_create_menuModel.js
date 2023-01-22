'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('menus', [{
        nombre: 'Tienda',
        icono: null,
        menuPadreId: null,
        link: null,
        posicion: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Administración',
        icono: null,
        menuPadreId: null,
        link: null,
        posicion: 20,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Productos',
        icono: null,
        menuPadreId: 1,
        link: null,
        posicion: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Marcas',
        icono: null,
        menuPadreId: 1,
        link: null,
        posicion: 20,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Impuestos',
        icono: null,
        menuPadreId: 1,
        link: null,
        posicion: 30,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Menus',
        icono: null,
        menuPadreId: 2,
        link: null,
        posicion: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Pantallas',
        icono: null,
        menuPadreId: 2,
        link: null,
        posicion: 20,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Roles',
        icono: null,
        menuPadreId: 8,
        link: null,
        posicion: 30,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Usuarios',
        icono: null,
        menuPadreId: 2,
        link: null,
        posicion: 40,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Permisos',
        icono: null,
        menuPadreId: 2,
        link: null,
        posicion: 50,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('menus', null, {});
  }
};