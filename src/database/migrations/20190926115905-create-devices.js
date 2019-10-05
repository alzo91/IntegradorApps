module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('devices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      uid: { type: Sequelize.STRING(64), allowNull: false }, // unique: true },
      name: { type: Sequelize.STRING(100), allowNull: true },
      operational_system: { type: Sequelize.STRING(100), allowNull: true },
      build_version: { type: Sequelize.STRING(10), allowNull: true },
      username: { type: Sequelize.STRING(100), allowNull: true },
      password: { type: Sequelize.STRING(100), allowNull: true },
      namespace: { type: Sequelize.STRING(100), allowNull: true },
      limit_measure: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      app_id: {
        type: Sequelize.BIGINT,
        references: {
          model: 'applications',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      blocked: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('devices');
  },
};
