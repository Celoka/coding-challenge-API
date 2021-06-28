export default {
  User: {
    events: (parent, args, context, info) => parent.getEvent(),
  },
  Event: {
    user: (parent, args, context, info) => parent.getUser(),
  },
  Query: {
    events: (parent, args, { models, user }, info) => models.Event.findAll(),
    event: (parent, { id }, { models }, info) => models.Event.findByPk(id),
  },
};
