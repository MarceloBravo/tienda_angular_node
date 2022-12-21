'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('usuarios', [{
      rut: '11.111.111-1',
      nombres: 'Marcelo',
      apellido1: 'Bravo',
      apellido2: 'Castillo',
      avatar: '',
      direccion: '12 Norte #123',
      fono: '987654321',
      email: 'mabc@live.cl',
      password: '123456',
      rolId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('usuarios', null, {});
  }
};