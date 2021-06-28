import express from 'express';

import { Event } from '../controllers';
import { subEventName, handleValidation } from '../middlewares/validators';
import loginRequired from '../middlewares/loginRequired';

const subEvent = express.Router();

subEvent.post(
  '/create-subevent',
  loginRequired,
  subEventName,
  handleValidation,
  Event.createSubEvent
);
export default subEvent;
