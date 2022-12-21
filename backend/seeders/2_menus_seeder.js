'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('menus', [{
        id: 1,
        nombre: 'Tienda',
        icono: null,
        menuPadreId: null,
        link: null,
        posicion: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        nombre: 'Administración',
        icono: null,
        menuPadreId: null,
        link: null,
        posicion: 20,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        nombre: 'Productos',
        icono: null,
        menuPadreId: 1,
        link: null,
        posicion: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        nombre: 'Marcas',
        icono: null,
        menuPadreId: 1,
        link: null,
        posicion: 20,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        nombre: 'Impuestos',
        icono: null,
        menuPadreId: 1,
        link: null,
        posicion: 30,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        nombre: 'Menus',
        icono: null,
        menuPadreId: 2,
        link: null,
        posicion: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        nombre: 'Pantallas',
        icono: null,
        menuPadreId: 2,
        link: null,
        posicion: 20,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        nombre: 'Roles',
        icono: null,
        menuPadreId: 8,
        link: null,
        posicion: 30,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        nombre: 'Usuarios',
        icono: null,
        menuPadreId: 2,
        link: null,
        posicion: 40,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 10,
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