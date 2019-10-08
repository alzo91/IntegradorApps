module.exports = {
  dialect: 'postgres', // 'mysql',
  username: 'postgres',
  password: 'dev@@2019',
  database: 'IntegratorApps', // 'IntegratorApps',
  host: '192.168.0.7', // '192.168.1.90',
  port: 5678,
  operatorAliases: false,
  define: {
    timestamp: true, // garante que vamos ter uma coluna create_at e update_at
    underscored: true,
    underscoredAll: true,
  },
};
