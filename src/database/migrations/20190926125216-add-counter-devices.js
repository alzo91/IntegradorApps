module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('devices', 'counter', {
      allowNull: false,
      defaultValue: 0,
      type: Sequelize.BIGINT,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('devices', 'counter');
  },
};
