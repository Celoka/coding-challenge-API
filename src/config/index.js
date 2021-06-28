import dotenv from 'dotenv';

dotenv.config();

const {
  ENVIRONMENT,
  PORT,
  HOST,
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
    HOST,
  },
  testing: {
    ...common,
    HOST,
  },
  production: {
    ...common,
    HOST,
  },
});

export default config[ENVIRONMENT || 'development'];
