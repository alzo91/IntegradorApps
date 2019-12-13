// password_hash: { allowNull: false, type: Sequelize.STRING },
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('applications', 'user_id', {
      type: Sequelize.BIGINT,
      references: {
        model: 'users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('applications', 'user_id');
  },
};
