module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('applications', {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: { allowNull: false, type: Sequelize.STRING(25) },
      description: Sequelize.STRING,
      blocked: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN,
      },
      created_at: { allowNull: false, type: Sequelize.DATE },
      updated_at: { allowNull: false, type: Sequelize.DATE },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('applications');
  },
};
