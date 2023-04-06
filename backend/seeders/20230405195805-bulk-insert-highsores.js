'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('highscores', [
      {
        user_id: '852832600883331073',
        user_name: 'FakeUser',
        highscore: 4,
        game_mode: 'wildcard',
        category: 'random',
        difficulty: 'random',
        limit: 10,
        achieved_at: new Date()
      },
      {
        user_id: '852832600883331073',
        user_name: 'FakeUser',
        highscore: 2,
        game_mode: 'wildcard',
        category: 'random',
        difficulty: 'random',
        limit: 10,
        achieved_at: new Date()
      },
      {
        user_id: '852832600883331073',
        user_name: 'FakeUser',
        highscore: 5,
        game_mode: 'wildcard',
        category: 'random',
        difficulty: 'random',
        limit: 10,
        achieved_at: new Date()
      },
      {
        user_id: '852832600883331073',
        user_name: 'FakeUser',
        highscore: 1,
        game_mode: 'wildcard',
        category: 'random',
        difficulty: 'random',
        limit: 10,
        achieved_at: new Date()
      },
      {
        user_id: '852832600883331073',
        user_name: 'FakeUser',
        highscore: 3,
        game_mode: 'wildcard',
        category: 'random',
        difficulty: 'random',
        limit: 10,
        achieved_at: new Date()
      }
    ]);

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('highscores', null, {});

  }
};
