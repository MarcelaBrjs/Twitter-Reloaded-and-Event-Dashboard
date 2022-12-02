'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        id: 1,
        firstName: 'Marcela',
        lastName: 'Barajas',
        email: 'marcela@email.com',
        password: 'password',
        isAdmin: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },
};
