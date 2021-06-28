/* eslint-disable no-console */
import dotenv from 'dotenv';
import app from './app';
import '@babel/polyfill';
import config from './config';

dotenv.config();

const { PORT } = config;

// eslint-disable-next-line require-jsdoc
async function main() {
  await app.listen(PORT || 8080);
  console.log(`server run on ${PORT}`);
}

main();
