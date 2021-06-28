import { Event, SubEvent } from '../models';
import { exitsOr404, response, resolver } from '../helper/http';
import config from '../config';

const { CLOUD_NAME, API_KEY, API_SECRET } = config;

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

const EventController = {
  createEvent: async (req, res) => {
    const { name, date } = req.body;
    const { id, username } = req.user;
    const CurrentDate = new Date();
    if (new Date(date) > CurrentDate) {
      return res
        .status(400)
        .json({ errors: ['Date cannot be greater than current date'] });
    }
    const event = await Event.create({
      name,
      date,
      createdBy: username,
      userId: id,
    });
    return response({
      res,
      message: `You have successfully created the event ${name}!`,
      data: event,
    });
  },
  createSubEvent: async (req, res) => {
    const { eventName, subEventName, date } = req.body;
    const { username } = req.user;
    const CurrentDate = new Date();

    if (new Date(date) > CurrentDate) {
      return res
        .status(400)
        .json({ errors: ['Date cannot be greater than current date'] });
    }
    const event = await Event.findOne({
      where: { name: eventName },
    });

    exitsOr404(event, 'This event does not exists');
    const subEvent = await SubEvent.create({
      name: subEventName,
      date,
      createdBy: username,
      eventId: event.id,
    });
    return response({
      res,
      message: 'You have successfully created a sub event',
      data: subEvent,
    });
  },
  getAllEvents: async (req, res) => {
    const { id } = req.user;
    const events = await Event.findAll({
      where: { userId: id },
      include: [{ model: SubEvent, as: 'subevent' }],
    });
    return response({
      res,
      message: 'Request successful',
      data: events,
    });
  },
  upDateEvent: async (req, res) => {
    const { id: userId } = req.user;
    const { id } = req.params;
    const event = await Event.findByPk(id);
    exitsOr404(event, 'This event does not exists');
    if (userId === event.userId) {
      const updatedEvent = await Event.update(req.body, {
        where: { id },
      });
      return response({
        res,
        message: `Event with the id ${id} has been successfully updated`,
        data: updatedEvent,
      });
    }
    return response({
      res,
      code: 403,
      errors: ['This event can only be updated by the author.'],
    });
  },
  eventPictureUpload: async (req, res) => {
    const { imageField } = req.body;
    const { id } = req.params;
    cloudinary.uploader
      .upload(imageField)
      .then((result) => {
        Event.update(
          { picture: result.secure_url },
          {
            where: { id },
          }
        ).then((data) => response({
            res,
            message: 'Image upload successful',
            data,
          }));
      })
      .catch((error) => response.status(500).send({
          message: 'Failed',
          error,
        }));
  },
  deleteEvent: async (req, res) => {
    const { id: userId } = req.user;
    const { id } = req.params;
    const event = await Event.findByPk(id);
    exitsOr404(event, 'This event does not exists');
    if (userId === event.userId) {
      const deletedEvent = await Event.destroy({
        where: { id },
      });
      exitsOr404(deletedEvent, 'This event does not exist');
      return response({
        res,
        message: `Event with the id ${id} has been successfully deleted.`,
        data: [],
      });
    }
    return response({
      res,
      code: 403,
      errors: ['This event can only be deleted by the author.'],
    });
  },
};

export default resolver(EventController);
