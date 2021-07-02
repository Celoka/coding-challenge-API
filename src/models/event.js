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
  Event.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [8, 16],
        },
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      picture: {
        type: DataTypes.STRING,
        defaultValue: 'a default image',
      },
      createdBy: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Event',
      validate: {
        checkDate() {
          if (new Date(this.date) > new Date()) {
            throw new Error('Date cannot be greater than current date');
          }
        },
      },
    }
  );
  return Event;
};
