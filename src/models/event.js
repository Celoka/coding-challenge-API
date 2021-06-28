/* eslint-disable valid-jsdoc */
/* eslint-disable require-jsdoc */
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Event.belongsTo(models.User, { foreignKey: 'userId', as: 'author' });
      Event.hasMany(models.SubEvent, { foreignKey: 'eventId', as: 'subevent' });
    }
  }
  Event.init({
    name: DataTypes.STRING,
    date: DataTypes.DATE,
    picture: DataTypes.STRING,
    createdBy: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};
