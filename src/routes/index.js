import express from 'express';

import userRoutes from './user';
import eventRoutes from './event';
import subEventRoutes from './subevent';

const app = express.Router();

app.get('/', (req, res) => res.status(200).send('WELCOME TO CODE CHALLENGE API'));

app.use('/users', userRoutes);
app.use('/event', eventRoutes);
app.use('/subevent', subEventRoutes);

export default app;
