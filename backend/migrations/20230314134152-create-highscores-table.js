'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('highscores', {
      highscore_id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      user_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      highscore: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      game_mode: {
        allowNull: false,
        values: [
          'wildcard',
          'specialized',
          'custom'
        ],
        type: Sequelize.ENUM
      },
      category: {
        allowNull: false,
        values: [
          'random',
          'arts_and_literature',
          'film_and_tv',
          'food_and_drink',
          'general_knowledge',
          'geography',
          'history',
          'music',
          'science',
          'society_and_culture',
          'sport_and_leisure'
        ],
        type: Sequelize.ENUM
      },
      difficulty: {
        allowNull: false,
        values: [
          'random',
          'easy',
          'medium',
          'hard'
        ],
        type: Sequelize.ENUM
      },
      limit: {
        allowNull: false,
        type: Sequelize.SMALLINT
      },
      achieved_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('highscores');
  }
};