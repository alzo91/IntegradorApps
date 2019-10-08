module.exports = {
  dialect: 'postgres', // 'mysql',
  username: process.env.DB_USER,
  password: process.env.DB_PASS, // 'dev@@2019',
  database: 'IntegratorApps', // 'IntegratorApps',
  host: process.env.DB_HOST, // '192.168.0.7', // '192.168.1.90',
  port: process.env.DB_PORT, // 5678,
  operatorAliases: false,
  define: {
    timestamp: true, // garante que vamos ter uma coluna create_at e update_at
    underscored: true,
    underscoredAll: true,
  },
};
