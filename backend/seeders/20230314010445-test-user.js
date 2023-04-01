'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('users', [
      {
        user_name: 'nova-tester',
        password_digest: 'nova-digest',
        first_name: 'Nova',
        last_name: 'Tester',
        email: 'nova@tester.com',
        role: 'admin',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('users', null, {});

  }
};
