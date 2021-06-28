require('dotenv').config();

module.exports = {
  development: {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DEV_DATABASE,
    host: process.env.HOST,
    dialect: process.env.DIALECT,
    use_env_variable: 'DEV_DATABASE',
  },
  test: {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.TEST_DATABASE,
    host: process.env.HOST,
    dialect: process.env.DIALECT,
    use_env_variable: 'TEST_DATABASE',
  },
  production: {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.PROD_DATABASE,
    host: process.env.HOST,
    dialect: process.env.DIALECT,
    use_env_variable: 'PROD_DATABASE',
  },
};
