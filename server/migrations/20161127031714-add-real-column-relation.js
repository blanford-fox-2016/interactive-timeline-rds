'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return [
      queryInterface.addColumn('Posts', 'UserId', Sequelize.INTEGER),
      queryInterface.addColumn('Comments', 'UserId', Sequelize.INTEGER),
      queryInterface.addColumn('Comments', 'PostId', Sequelize.INTEGER),
    ]

  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return [
      queryInterface.removeColumn('Posts', 'UserId'),
      queryInterface.removeColumn('Comments', 'UserId'),
      queryInterface.removeColumn('Comments', 'PostId'),
    ]
  }
};
