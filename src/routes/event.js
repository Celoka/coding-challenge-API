import express from 'express';
import { Event } from '../controllers';
import { eventName, handleValidation } from '../middlewares/validators';
import loginRequired from '../middlewares/loginRequired';

const event = express.Router();

event.post(
  '/create',
  loginRequired,
  eventName,
  handleValidation,
  Event.createEvent
);
event.get('/all-events', loginRequired, Event.getAllEvents);
event.put('/update-event/:id', loginRequired, Event.upDateEvent);
event.patch('/event-picture-upload/:id', loginRequired, Event.eventPictureUpload);
event.delete('/delete-event/:id', loginRequired, Event.deleteEvent);

export default event;
