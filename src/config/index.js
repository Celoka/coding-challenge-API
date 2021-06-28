import dotenv from 'dotenv';

dotenv.config();

const {
  ENVIRONMENT,
  PORT,
  USERNAME,
  PASSWORD,
  DATABASE,
  HOST,
  DIALECT,
  JWT_SECRET,
  CLOUD_NAME,
  API_KEY,
  API_SECRET
} = process.env;

const common = {
  ENVIRONMENT,
  PORT,
  JWT_SECRET,
  CLOUD_NAME,
  API_KEY,
  API_SECRET,
};

const config = Object.freeze({
  development: {
    ...common,
    USERNAME,
    PASSWORD,
    DATABASE,
    HOST,
    DIALECT,
  },
  testing: {
    ...common,
    USERNAME,
    PASSWORD,
    DATABASE,
    HOST,
    DIALECT,
  },
  production: {
    ...common,
    USERNAME,
    PASSWORD,
    DATABASE,
    HOST,
    DIALECT,
  },
});

export default config[ENVIRONMENT || 'development'];
