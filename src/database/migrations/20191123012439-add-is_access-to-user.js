module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'verify_access', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'verify_access');
  },
};
