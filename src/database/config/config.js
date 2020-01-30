require('dotenv').config();

module.exports = {
  development: {
    url: process.env.DEV_DATABASE_URL,
    dialect: 'postgres',
    use_env_variable: true,
  },
  test: {
    url: process.env.DEV_DATABASE_URL,
    dialect: 'postgres',
    use_env_variable: true,
  },
  production: {
    url: process.env.DEV_DATABASE_URL,
    dialect: 'postgres',
    use_env_variable: true,
  },
};
