/* eslint-disable valid-jsdoc */
/* eslint-disable require-jsdoc */
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SubEvent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SubEvent.belongsTo(models.Event, { foreignKey: 'eventId', as: 'event' });
    }
  }
  SubEvent.init({
    name: DataTypes.STRING,
    date: DataTypes.DATE,
    picture: DataTypes.STRING,
    createdBy: DataTypes.STRING,
    eventId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SubEvent',
  });
  return SubEvent;
};
